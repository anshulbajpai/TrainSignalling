describe("Train",function() {
	var trainControllerSpy, train, startPosition = new Position(2,3),speed = 5;
	beforeEach(function() {
		trainControllerSpy = jasmine.createSpyObj("train controller spy",['canMove','update']);
		train = new Train(startPosition,trainControllerSpy,speed);
	});

	describe("moving", function() {
		it("moves to a new position if it can move",function() {
			trainControllerSpy.canMove.andReturn(true);
			train.move();
			expect(trainControllerSpy.canMove).toHaveBeenCalledWith(startPosition,new Position(7,3));
			expect(train.getPosition()).toEqual(new Position(7,3));
			expect(trainControllerSpy.update).toHaveBeenCalledWith(startPosition,new Position(7,3));
		});

		it("does not moves to a new position if it cannot move",function() {
			trainControllerSpy.canMove.andReturn(false);
			train.move();
			expect(trainControllerSpy.canMove).toHaveBeenCalledWith(startPosition,new Position(7,3));
			expect(train.getPosition()).toBe(startPosition);
			expect(trainControllerSpy.update).not.toHaveBeenCalled();
		});
	});
});