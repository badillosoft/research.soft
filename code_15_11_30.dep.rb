# Alan Badillo Salas | badillo.soft@hotmail.com
# Ruby - Árboles de ordenamiento

require 'json'

class Node
	def initialize(value)
		@left = nil
		@right = nil
		@value = value
	end
	
	def clone
		node = Node.new(@value)
		
		node.left = @left.nil? ? nil : @left.clone
		node.right = @right.nil? ? nil : @right.clone
		
		return node
	end
	
	def single; Node.new(@value) end
	def value; @value end
	def left; @left end
	def right; @right end
	
	def left=(value); @left = value end
	def right=(value); @right = value end
	
	def <<(value)
		if value <= @value
			@left.nil? ? @left = Node.new(value) : @left << value 
		elsif value > @value
			@right.nil? ? @right = Node.new(value) : @right << value
		end
	end
	
	def optimize(a)
		n = a.size
		
		if n <= 0
			return nil
		end
		
		m = a.size / 2
		
		root = Node.new(a[m])
		
		root.left = optimize(a[0...m]) 
		root.right = optimize(a[(m + 1)..-1])
		
		return root
	end
	
	def optimize!
		root = optimize(to_a)
		
		@value = root.value
		@left = root.left
		@right = root.right
	end
	
	def to_s
		s = "#{@left} #{@value} #{@right}"
	end
	
	def to_dic(compact = true)
		data = {:value => @value}
		
		if compact
			unless @left.nil?
				data[:left] = @left.to_dic(compact)
			end
			unless @right.nil?
				data[:right] = @right.to_dic(compact)
			end
		else
			data[:left] = @left.nil? ? nil : @left.to_dic
			data[:right] = @right.nil? ? nil : @right.to_dic
		end
		
		return data
	end
	
	def to_a
		a = []
		
		unless @left.nil?
			@left.to_a.each do |value|
				a << value
			end
		end
		
		a << @value
		
		unless @right.nil?
			@right.to_a.each do |value|
				a << value
			end
		end
		
		return a
	end
	
	def left_depth
		@left.nil? ? 0 : 1 + @left.left_depth
	end
	
	def right_depth
		@right.nil? ? 0 : 1 + @right.right_depth
	end
	
	def left_size
		@left.nil? ? 0 : @left.left_size + @left.right_size + 1 
	end
	
	def right_size
		@right.nil? ? 0 : @right.left_size + @right.right_size + 1
	end
	
	def size; 1 + left_size + right_size end
end

def optimize2(node, n = 100)
	if n < 0
		return node
	end

	if node.nil?
		return nil
	end

	root = node
	
	if root.left_size > root.right_size
		root = root.left
		root << node.value
		node.right.to_a.sort_by{rand}.each do |value|
			root << value
		end
		root = optimize(root, n - 1)
	elsif root.left_size < root.right_size
		root = root.right
		root << node.value
		node.left.to_a.sort_by{rand}.each do |value|
			root << value
		end
		root = optimize(root, n - 1)
	end
	
	return root
end

def optimize(a)
	n = a.size
	
	if n <= 0
		return nil
	end
	
	m = a.size / 2
	
	root = Node.new(a[m])
	
	root.left = optimize(a[0...m]) 
	root.right = optimize(a[(m + 1)..-1])
	
	return root 
end

root = Node.new(1)
#.sort_by { rand }
(2..1000).each do |value|
	root << value
end

puts "Tamaño: #{root.size}, L(#{root.left_size}) R(#{root.right_size})"

#puts root

#puts root.to_dic.to_json

#p root.to_a

oroot = optimize(root.to_a)

puts "Tamaño: #{oroot.size}, L(#{oroot.left_size}) R(#{oroot.right_size})"

#puts oroot

#puts oroot.to_dic.to_json

#p oroot.to_a

#puts ({
#	:original => root.to_dic,
#	:optimized => oroot.to_dic
#}).to_json