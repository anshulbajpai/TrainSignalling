describe("Main controller",function() {
	var busSpy, routeSpy, blockSpy, mainController;
	beforeEach(function() {
		routeSpy = jasmine.createSpyObj('route',['getId','findBlock']);
		blockSpy = jasmine.createSpyObj('block',['previous','getId']);
		busSpy = jasmine.createSpyObj('bus', ['subscribe','trigger']);
		mainController = new MainController([routeSpy],busSpy);
	});

	it("subscribes to bus for block occupied",function() {
		expect(busSpy.subscribe).toHaveBeenCalledWith("block.occupied",mainController.onBlockOccupy, mainController);
	});

	describe("on block occupied",function() {
		it("does not trigger bus if a route is not found",function() {
			mainController.onBlockOccupy(-1, null);
			expect(busSpy.trigger).not.toHaveBeenCalled();
		});

		it("does not trigger bus if a block is not found",function() {
			routeSpy.getId.andReturn(1);
			routeSpy.findBlock.andReturn(null);
			mainController.onBlockOccupy(1, -1);
			expect(routeSpy.findBlock).toHaveBeenCalledWith(-1);
			expect(busSpy.trigger).not.toHaveBeenCalled();
		});

		it("triggers the bus for all states", function() {
			routeSpy.getId.andReturn(1);
			routeSpy.findBlock.andReturn(blockSpy);
			blockSpy.previous.andReturn(blockSpy);
			blockSpy.getId.andReturn(3);
			mainController.onBlockOccupy(1,4);
			expect(routeSpy.findBlock).toHaveBeenCalledWith(4);
			expect(busSpy.trigger).toHaveBeenCalledWith("state.change.block.4",[4,State.RED]);
			expect(busSpy.trigger).toHaveBeenCalledWith("state.change.block.3",[3,State.ORANGE]);
			expect(busSpy.trigger).toHaveBeenCalledWith("state.change.block.3",[3,State.YELLOW]);
			expect(busSpy.trigger).toHaveBeenCalledWith("state.change.block.3",[3,State.GREEN]);
		});
	});
});