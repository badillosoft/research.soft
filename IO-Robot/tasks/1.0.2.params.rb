require 'optparse'

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: ruby script.rb [options]"

  opts.on("-i i", "--input i", "Read input number") do |i|
    options[:in] = i.to_f
  end
  
  opts.on("-map m", "--map m", "Read the map function") do |m|
    options[:map] = m
  end
end.parse!

if options[:in].nil? or options[:map].nil?
	puts "Error arguments, try --help argument"
	exit
end

i = options[:in]

# p options[:map]

puts eval options[:map]