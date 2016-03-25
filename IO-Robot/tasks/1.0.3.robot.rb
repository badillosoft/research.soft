require 'json'

str = ''

while line = gets
	str << line.chomp
end

json = JSON.parse str

json.each do |k, v|
	if v.is_a? Numeric
		json[k] = v + 1
	end
end

