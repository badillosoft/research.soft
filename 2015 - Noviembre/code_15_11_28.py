# Alan Badillo Salas | badillo.soft@hotmail.com
# Python - Números primos menores o iguales a 100

prs = {}
for n in range(2, 101):
	if not prs.has_key(n):
		prs[n] = True
		
	for k in range(2 * n, 101, n):
		prs[k] = False
		
	print "%d\t%s" %(n, 'primo' if prs[n] else 'no')