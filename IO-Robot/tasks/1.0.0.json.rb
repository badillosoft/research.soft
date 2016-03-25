require 'json'

str = ''

while line = gets
	str << line.chomp
end

json = JSON.parse str

arr = []

json.each do |k, v|
	arr << k
end

p arr