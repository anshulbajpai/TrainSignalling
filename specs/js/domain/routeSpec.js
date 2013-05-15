describe("Route",function() {

	var route = new Route(1, [
		new Block(1, 10, new Position(0,0), State.GREEN),
		new Block(2, 10, new Position(10,0), State.RED),
		new Block(3, 10, new Position(20,0), State.GREEN)
		]);

	it("tells if the new position can be moved on the route",function() {
		expect(route.canMove(new Position(0,0), new Position(-1,0))).toBeFalsy();
		expect(route.canMove(new Position(0,0), new Position(32,0))).toBeFalsy();
		expect(route.canMove(new Position(0,0), new Position(12,0))).toBeFalsy();
		expect(route.canMove(new Position(0,0), new Position(22,0))).toBeTruthy();
		expect(route.canMove(new Position(0,0), new Position(8,0))).toBeTruthy();
	});

	it("updates a block's state successfully if found", function() {
		route.updateBlock(3, State.RED);
		expect(route.canMove(new Position(0,0), new Position(22,0))).toBeFalsy();
	});

	describe("returning block id",function() {
		it("returns block id when finds position",function() {
			expect(route.currentBlockId(new Position(12,0))).toEqual(2);
		});

		// IGNORED
		// it("throws error when position could not be found",function() {
		// 	expect(route.currentBlockId(new Position(-1,0))).toThrow("");			
		// });

	});

	it("finds block by position",function() {
		expect(route.findBlockByPosition(new Position(5,0)).getId()).toEqual(1);
		expect(route.findBlockByPosition(new Position(-6,0))).toBeNull();
	});

	it("returns all block ids", function() {
		var blockIds = route.getBlockIds();
		expect(blockIds.length).toEqual(3);
		expect(blockIds).toContain(1);
		expect(blockIds).toContain(2);
		expect(blockIds).toContain(3);
	});

	it("tells if positions are not on the same block",function() {
		expect(route.areNotOnSameBlock(new Position(-1,0), new Position(1,0))).toBeTruthy();
		expect(route.areNotOnSameBlock(new Position(1,0), new Position(-1,0))).toBeTruthy();
		expect(route.areNotOnSameBlock(new Position(1,0), new Position(12,0))).toBeTruthy();
		expect(route.areNotOnSameBlock(new Position(1,0), new Position(2,0))).toBeFalsy();
	});
});