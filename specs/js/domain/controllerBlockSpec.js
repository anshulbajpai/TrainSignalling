describe("Controller Block", function() {

	describe("finding a block by id", function() {

		var controllerBlock = new ControllerBlock(5, new ControllerBlock(4, new NullControllerBlock()));		

		it("returns block if it finds", function() {
			expect(controllerBlock.findBlock(5)).toBe(controllerBlock);
			expect(controllerBlock.findBlock(4)).toBe(controllerBlock.previous());
		});

		it("returns null if it could not find",function() {
			expect(controllerBlock.findBlock(3)).toBeNull();
		});
	});

	describe("NullController Block", function() {
		var nullControllerBlock = new NullControllerBlock();
		it("returns id as -1",function() {
			expect(nullControllerBlock.getId()).toEqual(-1);
		});

		it("returns previous as itself",function() {
			expect(nullControllerBlock.previous()).toBe(nullControllerBlock);
		});
	});

});