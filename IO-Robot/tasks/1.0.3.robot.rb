require 'json'
require '../robot'

str = ''

while line = gets
	str << line.chomp
end

json = JSON.parse str

r = Robot.new(json["robot"]["position"], json["robot"]["angle"])

puts r.move(json["do"]["distance"].to_f).to_json
