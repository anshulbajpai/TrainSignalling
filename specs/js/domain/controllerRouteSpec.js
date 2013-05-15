describe("Contoller Route",function() {
	var contollerBlockSpy, contollerRoute;
	beforeEach(function() {
		contollerBlockSpy = jasmine.createSpyObj('controllerblock', ['findBlock']);
		contollerRoute = new ControllerRoute(1,contollerBlockSpy);
	});

	it("finds block by id",function() {
		var blockId = 123;
		var expected = {id : 123};
		contollerBlockSpy.findBlock.andReturn(expected);
		expect(contollerRoute.findBlock(blockId)).toBe(expected);
		expect(contollerBlockSpy.findBlock).toHaveBeenCalledWith(123)
	});

});