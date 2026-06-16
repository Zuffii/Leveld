begin
  require 'bundler/setup'
rescue LoadError
  # Fallback if bundler is not installed/used
end
require 'webrick'
require 'json'
require 'fileutils'
require 'net/http'
require 'uri'

# Load .env file if it exists
env_file = File.expand_path('.env', __dir__)
if File.exist?(env_file)
  File.readlines(env_file).each do |line|
    line = line.strip
    next if line.empty? || line.start_with?('#')
    key, val = line.split('=', 2)
    if key && val
      ENV[key.strip] = val.strip.gsub(/\A['"]|['"]\z/, '')
    end
  end
end

DB_FILE = File.expand_path('users_db.json', __dir__)

# Initialize DB file if not exists
unless File.exist?(DB_FILE)
  File.write(DB_FILE, JSON.pretty_generate([]))
end

def read_db
  JSON.parse(File.read(DB_FILE))
rescue => e
  puts "Error reading DB: #{e.message}"
  []
end

def write_db(data)
  File.write(DB_FILE, JSON.pretty_generate(data))
rescue => e
  puts "Error writing DB: #{e.message}"
end

# Custom WEBrick server to set proper content-type headers for ES6 JS modules and handle API requests
class ES6Server < WEBrick::HTTPServer
  def service(req, res)
    # Check if this is an API request
    if req.path.start_with?('/api/')
      res['Content-Type'] = 'application/json'
      res['Access-Control-Allow-Origin'] = '*'
      res['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      res['Access-Control-Allow-Headers'] = 'Content-Type'
      
      if req.request_method == 'OPTIONS'
        res.status = 200
        res.body = ''
        return
      end

      begin
        body_data = req.body ? JSON.parse(req.body) : {}
      rescue => e
        res.status = 400
        res.body = { error: "Invalid JSON body: #{e.message}" }.to_json
        return
      end

      case req.path
      when '/api/debug_log'
        puts "\n[CLIENT_DEBUG] #{req.query['msg']}\n"
        res.status = 200
        res.body = { status: 'ok' }.to_json
        return

      when '/api/scour'
        openrouter_key = ENV['OPENROUTER_API_KEY']&.strip
        if !openrouter_key || openrouter_key.empty?
          res.status = 500
          res.body = { error: "OpenRouter API Key not configured on the server." }.to_json
          return
        end
        prompt = body_data['prompt']
        
        uri = URI.parse('https://openrouter.ai/api/v1/chat/completions')
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true
        http.open_timeout = 10
        http.read_timeout = 25
        
        post_req = Net::HTTP::Post.new(uri.request_uri)
        post_req['Content-Type'] = 'application/json'
        post_req['Authorization'] = "Bearer #{openrouter_key}"
        post_req.body = {
          model: 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }]
        }.to_json
        
        response = http.request(post_req)
        res.status = response.code.to_i
        res.body = response.body
        return

      when '/api/chat'
        api_key = ENV['ANTHROPIC_API_KEY']&.strip&.gsub('\n', '')&.gsub("\n", "")
        if !api_key || api_key.empty?
          res.status = 200
          res.body = { fallback: true, error: "Anthropic API Key not set" }.to_json
          return
        end

        message = body_data['message']
        chat_history = body_data['history'] || []
        user_info = body_data['user'] || {}

        assistant_type = body_data['assistant'] || 'ivy'
        if assistant_type == 'bob'
          system_prompt = <<~SYSTEM
            You are Bob the Builder 🔨, a friendly, enthusiastic, and highly skilled AI web design and portfolio building assistant on the Leveld platform.
            You help students design and optimize their digital portfolio showcase websites.
            
            Student Profile Context:
            - Name: #{user_info['name'] || 'Student'}
            - Grade: #{user_info['grade'] || 'N/A'}
            - School: #{user_info['school'] || 'N/A'}
            - Location: #{user_info['city'] || 'N/A'}, #{user_info['country'] || 'N/A'}
            - Career Goals: #{user_info['careerGoals'] || 'N/A'}
            - Skills: #{(user_info['skills'] || []).join(', ')}
            - Interests: #{(user_info['interests'] || []).join(', ')}
            
            Your role:
            - Suggest layout improvements, theme preset choices (Warm Yellow, Electric Indigo, Emerald Sunset, Cyberpunk Neon, Sakura Blossom, Ocean Breeze, Royal Obsidian, Neon Mint, Midnight Dark), typography, and custom color combinations.
            - Help write highly professional, credible, and polished bios (greetings) for their portfolio. Avoid fluff and fake achievements; make them sound mature, motivated, and genuine.
            - Help organize portfolio achievements/awards into clear categories.
            - Bob's Personality: Upbeat, constructive, loves emojis (especially 🔨, 🎨, ⚡, 🏗️, 🧱), and speaks with high energy (e.g., "Let's build it!", "We can cook up a masterpiece!").
            - Formatting: Use Markdown (bold, lists) to keep it easy to read.
            
            🔧 PORTFOLIO DIRECT EDIT CONTROLS:
            You can directly edit their website in real-time! If they ask you to change settings, themes, layouts, fonts, or update their bio or toggle sections, you must append one or more command tags to the end of your message:
            1. Update style settings:
               [[UPDATE_STYLE: {"themePreset": "warm-yellow"}]]
               Valid presets: 'warm-yellow', 'electric-indigo', 'emerald-sunset', 'cyberpunk-dark', 'sakura-blossom', 'ocean-breeze', 'royal-obsidian', 'neon-mint', 'midnight-dark'.
               Or individual settings:
               [[UPDATE_STYLE: {"layout": "column", "fontFamily": "Courier New", "borderRadius": "12", "glassOpacity": 0.45, "bgPattern": "dots"}]]
            2. Update the portfolio bio/greeting:
               [[UPDATE_BIO: "Your mature bio text here..."]]
            3. Toggle sections on/off:
               [[TOGGLE_SECTION: {"sectionId": "achievements", "visible": false}]]
               Valid sectionIds: 'hero', 'scores', 'achievements', 'timeline'.
            
            Example: If they ask to use column layout and warm yellow, write: "Done! I've set your theme to Warm Yellow and adjusted the layout to a vertical column. [[UPDATE_STYLE: {\"themePreset\": \"warm-yellow\", \"layout\": \"column\"}]]"
          SYSTEM
        else
          system_prompt = <<~SYSTEM
            You are Ivy, a helpful, witty, and highly intelligent AI academic and career advisor for high school and college students using the Leveld platform.
            You help students optimize their profiles for top universities, scholarships, and careers.
            
            Student Profile Context:
            - Name: #{user_info['name'] || 'Student'}
            - Grade: #{user_info['grade'] || 'N/A'}
            - School: #{user_info['school'] || 'N/A'}
            - Location: #{user_info['city'] || 'N/A'}, #{user_info['country'] || 'N/A'}
            - Career Goals: #{user_info['careerGoals'] || 'N/A'}
            - Skills: #{(user_info['skills'] || []).join(', ')}
            - Interests: #{(user_info['interests'] || []).join(', ')}
            
            Platform Features Guide:
            - Opportunities / Discovery Page: (#discovery) - Surfaced personalized high-matching internships, competitions, scholarships.
            - Roadmap Tab: (#roadmap) - Interactive study and milestone tracks.
            - Extracurriculars Tab: (#extracurriculars) - Passion projects and research outlines.
            - University Readiness: (#readiness) - Track college chances and requirements.
            - Essay Studio: (#essay) - Draft and critique college application essays.
            
            Ivy's Personality:
            - Extremely chill, witty, and supportive Gen Z AI advisor. Use modern Gen Z slang naturally (e.g., "fr fr", "no cap", "bruh", "lowkey", "cooking", "slay", "rizz", "main character energy", "bet", "real") but keep the core advice highly intelligent, practical, and helpful.
            - Proactive: always offer clear next actions or specific suggestions.
            - Markdown formatting: Use bolding, lists, and links (e.g. [Roadmap](#roadmap) or [Opportunities](#discovery)) when referring to sections of the application.
          SYSTEM
        end

        messages = []
        chat_history.each do |msg|
          role = msg['sender'] == 'user' ? 'user' : 'assistant'
          
          # Skip initial assistant messages (Anthropic API requires first message to be from 'user')
          next if messages.empty? && role == 'assistant'
          
          # Merge consecutive messages with the same role (Anthropic API requires strictly alternating roles)
          if !messages.empty? && messages.last[:role] == role
            messages.last[:content] += "\n" + msg['text']
          else
            messages << { role: role, content: msg['text'] }
          end
        end

        if messages.empty? || messages.last[:role] != 'user'
          messages << { role: 'user', content: message }
        else
          messages.last[:content] += "\n" + message
        end

        response = nil
        last_error = nil
        model_used = nil
        models_to_try = [
          'claude-sonnet-4-6',
          'claude-sonnet-4-5-20250929',
          'claude-haiku-4-5-20251001',
          'claude-opus-4-6',
          'claude-fable-5',
          'claude-3-5-sonnet-20241022',
          'claude-3-5-sonnet-20240620',
          'claude-3-haiku-20240307'
        ]

        models_to_try.each do |model|
          model_used = model
          req_body = {
            model: model,
            max_tokens: 1024,
            system: system_prompt,
            messages: messages
          }.to_json

          begin
            uri = URI.parse('https://api.anthropic.com/v1/messages')
            http = Net::HTTP.new(uri.host, uri.port)
            http.use_ssl = true
            http.open_timeout = 8
            http.read_timeout = 15

            post_req = Net::HTTP::Post.new(uri.request_uri)
            post_req['Content-Type'] = 'application/json'
            post_req['x-api-key'] = api_key
            post_req['anthropic-version'] = '2023-06-01'
            post_req.body = req_body

            response = http.request(post_req)

            if response.code.to_i == 200
              break
            else
              last_error = "Model #{model} failed: #{response.code} - #{response.body}"
              # If model is not found or unsupported, try next model in the list
              if response.code.to_i == 404 || response.body.include?("not_found_error") || response.body.include?("model_not_found")
                next
              else
                # If it's a 401 Unauthorized or other fundamental error, do not retry other models
                break
              end
            end
          rescue => e
            last_error = "Model #{model} exception: #{e.message}"
            next
          end
        end

        if response && response.code.to_i == 200
          resp_data = JSON.parse(response.body)
          reply = resp_data.dig('content', 0, 'text')
          res.status = 200
          res.body = { reply: reply, model: model_used }.to_json
        else
          puts "[Claude API Error] #{last_error}"
          res.status = 200
          res.body = { fallback: true, error: last_error || "All Claude models failed", key_info: { length: api_key&.length, start: api_key ? api_key[0..10] : '', ending: api_key ? api_key[-10..-1] : '', has_literal_newline: api_key&.include?('\n'), has_real_newline: api_key&.include?("\n") } }.to_json
        end
        return

      when '/api/register'
        db = read_db
        username = body_data.dig('user', 'username')&.strip&.downcase
        email = body_data.dig('user', 'email')&.strip&.downcase
        password = body_data.dig('user', 'password')

        if !username || !email || !password
          res.status = 400
          res.body = { error: "Username, email, and password are required." }.to_json
          return
        end

        if db.any? { |u| u.dig('user', 'username')&.downcase == username }
          res.status = 400
          res.body = { error: "Username already exists." }.to_json
          return
        end

        if db.any? { |u| u.dig('user', 'email')&.downcase == email }
          res.status = 400
          res.body = { error: "Email already exists." }.to_json
          return
        end

        # Add default achievements and state parameters
        body_data['xp'] ||= 100
        body_data['level'] ||= 1
        body_data['streak'] ||= 1
        body_data['lastActiveDate'] ||= Time.now.strftime('%Y-%m-%d')
        body_data['completedMilestones'] ||= []
        body_data['savedOpportunities'] ||= []
        body_data['opportunityApplications'] ||= {}
        body_data['projects'] ||= []
        body_data['essayCritiques'] ||= []

        # Add to JSON DB list
        db << body_data
        write_db(db)

        res.status = 201
        res.body = { message: "User registered successfully.", state: body_data }.to_json

      when '/api/login'
        db = read_db
        login_id = body_data['username']&.strip&.downcase # can be username or email
        password = body_data['password']

        if !login_id || !password
          res.status = 400
          res.body = { error: "Username/email and password are required." }.to_json
          return
        end

        # Search by username or email
        match = db.find do |u|
          u['user'] && (
            u.dig('user', 'username')&.downcase == login_id ||
            u.dig('user', 'email')&.downcase == login_id
          )
        end

        if match
          if match.dig('user', 'password') == password
            res.status = 200
            res.body = { message: "Login successful.", state: match }.to_json
          else
            res.status = 401
            res.body = { error: "Incorrect password." }.to_json
          end
        else
          res.status = 404
          res.body = { error: "User profile not found." }.to_json
        end

      when '/api/sync'
        db = read_db
        username = body_data.dig('user', 'username')&.strip&.downcase

        if !username
          res.status = 400
          res.body = { error: "User username is required to sync." }.to_json
          return
        end

        idx = db.find_index { |u| u.dig('user', 'username')&.downcase == username }
        if idx
          db[idx] = body_data
          write_db(db)
          res.status = 200
          res.body = { message: "Sync successful." }.to_json
        else
          # Fallback: if not found in db, maybe it was created client-side, let's append it
          db << body_data
          write_db(db)
          res.status = 200
          res.body = { message: "Sync appended new profile successfully." }.to_json
        end

      when '/api/leaderboard'
        db = read_db
        leaderboard = db.map do |entry|
          user = entry['user'] || {}
          {
            name: user['name'] || 'Anonymous',
            username: user['username'] || '',
            xp: entry['xp'] || 0,
            level: entry['level'] || 1,
            streak: entry['streak'] || 0,
            school: user['school'] || '',
            country: user['country'] || '',
            city: user['city'] || '',
            careerGoals: user['careerGoals'] || '',
            skills: user['skills'] || [],
            interests: user['interests'] || [],
            dreamUniversities: user['dreamUniversities'] || [],
            grade: user['grade'] || ''
          }
        end
        leaderboard.sort_by! { |u| -(u[:xp] || 0) }
        res.status = 200
        res.body = { leaderboard: leaderboard }.to_json

      when '/api/admin/students'
        db = read_db
        res.status = 200
        res.body = { students: db }.to_json

      when '/api/delete-account'
        db = read_db
        username = body_data['username']&.strip&.downcase
        if !username
          res.status = 400
          res.body = { error: "Username is required to delete account." }.to_json
          return
        end

        idx = db.find_index { |u| u.dig('user', 'username')&.downcase == username }
        if idx
          db.delete_at(idx)
          write_db(db)
          res.status = 200
          res.body = { message: "Account deleted successfully." }.to_json
        else
          res.status = 404
          res.body = { error: "Account not found." }.to_json
        end

      else
        res.status = 404
        res.body = { error: "API endpoint not found." }.to_json
      end

    else
      if req.path == '/delay_load.png'
        if (req.query && req.query['delay'] == 'true') || (req.query_string && req.query_string.include?('delay=true'))
          sleep 3.0
        end
        res['Content-Type'] = 'image/png'
        res.body = [71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 0, 0, 0, 0, 0, 255, 255, 255, 33, 249, 4, 1, 0, 0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 73, 1, 0, 59].pack('C*')
        return
      end

      # Serve static files
      super
      # Prevent browser caching during development
      res['Cache-Control'] = 'no-cache, no-store, must-revalidate'
      res['Pragma'] = 'no-cache'
      res['Expires'] = '0'
      if res.filename && res.filename.end_with?('.js')
        res['Content-Type'] = 'application/javascript'
      end
    end
  end
end

server = ES6Server.new(
  Port: ENV['PORT'] || 3000,
  DocumentRoot: File.expand_path(__dir__)
)

trap('INT') { server.shutdown }

puts "\n=============================================="
puts " Leveld Dev Server running on http://localhost:#{server.config[:Port]}"
puts " Press Ctrl+C to stop the server"
puts "==============================================\n"

server.start
