# Alan Badillo Salas | badillo.soft@hotmail.com
# Ruby - Números primos menores o iguales a 100

prs = []
2.upto(100) do |n| 
	prs[n] = true if prs[n].nil?
	
	(2 * n).step(100, n) do |k|
		prs[k] = false
	end
	
	puts "#{n}\t#{prs[n] ? 'primo' : 'no'}"
end