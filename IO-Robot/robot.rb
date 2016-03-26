require 'json'

class Robot
	def initialize(position = {:x => 0, :y => 0}, angle = 0)
		@p = {:x => 0, :y => 0} 
		@a = angle
		
		@p[:x] = position[:x] || position["x"]
		@p[:y] = position[:y] || position["y"]
	end
	
	def position; @p end
	def x; @p[:x] end
	def y; @p[:y] end
	def angle; @a * Math::PI / 180.0 end
	def dangle; @a end
	
	def position=(value); @p[:x], @p[:y] = value[:x], value[:y] end
	def x=(value); @p[:x] = value end
	def y=(value); @p[:y] = value end
	def angle=(value); @a = value * Math::PI / 180.0 end
	def dangle=(value); @a = value end
	
	def to_s; "(#{x}, #{y}) #{dangle}" end
	
	def to_json
		obj = {
			:robot => {
				:position => {
					:x => x,
					:y => y
				},
				:angle => dangle
			}
		}
		
		obj.to_json
	end
	
	def move(d)
		self.x += d * Math.cos(angle)
		self.y += d * Math.sin(angle)
		self
	end
end