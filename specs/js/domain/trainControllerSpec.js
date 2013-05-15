describe("Train Controller",function() {

	var routeSpy,busSpy,trainController;
	beforeEach(function() {
		routeSpy = jasmine.createSpyObj('route',['getBlockIds','canMove', 'areNotOnSameBlock', 'getId', 'findBlockByPosition', 'updateBlock']);
		busSpy = jasmine.createSpyObj('bus',['subscribe','trigger']);
		routeSpy.getBlockIds.andReturn([1,2,3]);
		trainController = new TrainController(routeSpy, busSpy);
	});

	it("subscribes for block state change", function() {
		expect(busSpy.subscribe).toHaveBeenCalledWith("state.change.block.1", trainController.onBlockUpdated, trainController);
		expect(busSpy.subscribe).toHaveBeenCalledWith("state.change.block.2", trainController.onBlockUpdated, trainController);
		expect(busSpy.subscribe).toHaveBeenCalledWith("state.change.block.3", trainController.onBlockUpdated, trainController);
	});


	it("tells if it can move",function() {
		routeSpy.canMove.andReturn(true);
		expect(trainController.canMove(new Position(1,0), new Position(2,0))).toBeTruthy();
		expect(routeSpy.canMove).toHaveBeenCalledWith(new Position(1,0), new Position(2,0));		
	});

	describe('updating bus for block state occupy',function() {

		it("updates if current and new position are on different block",function() {
			var currentPosition = new Position(1,1);
			var newPosition = new Position(1,2);
			routeSpy.findBlockByPosition.andReturn(new Block(7,null,null,null));
			routeSpy.areNotOnSameBlock.andReturn(true);
			routeSpy.getId.andReturn(5);
			trainController.update(currentPosition, newPosition);
			expect(routeSpy.areNotOnSameBlock).toHaveBeenCalledWith(currentPosition, newPosition);
			expect(routeSpy.findBlockByPosition).toHaveBeenCalledWith(newPosition);
			expect(busSpy.trigger).toHaveBeenCalledWith("block.occupied",[5,7]);
		});

		it("does not trigger if positions are on the same block",function() {
			var currentPosition = new Position(1,1);
			var newPosition = new Position(3,2);
			routeSpy.areNotOnSameBlock.andReturn(false);
			trainController.update(currentPosition, newPosition);
			expect(routeSpy.areNotOnSameBlock).toHaveBeenCalledWith(currentPosition, newPosition);
			expect(busSpy.trigger).not.toHaveBeenCalled();
		});
	});

	it("updates a route when callback is called",function() {
		trainController.onBlockUpdated(1, State.GREEN);
		expect(routeSpy.updateBlock).toHaveBeenCalledWith(1, State.GREEN);	
	});
});