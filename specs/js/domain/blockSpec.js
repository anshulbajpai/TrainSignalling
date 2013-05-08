describe("Block",function() {
	
	it("tells if the block is safe",function() {
		expect(new Block(null,null,null,State.GREEN).isSafe()).toBeTruthy();
		expect(new Block(null,null,null,State.RED).isSafe()).toBeFalsy();
	});

	it("tells if a position is within block",function() {
		var block = new Block(1,10,new Position(0,0),null); 
		expect(block.contains(new Position(0,0))).toBeTruthy();
		expect(block.contains(new Position(5,0))).toBeTruthy();
		expect(block.contains(new Position(-1,0))).toBeFalsy();
		expect(block.contains(new Position(10,0))).toBeFalsy();
	});

	it("occupies a block",function() {
		var block = new Block(null, null, null,State.GREEN);
		block.occupy();
		expect(block.isSafe()).toBeFalsy();
	});

	it("tells if blocks are equals",function() {
		expect(new Block(null,null,null,null).equals(null)).toBeFalsy();
		expect(new Block(null,null,null,null).equals(undefined)).toBeFalsy();
		expect(new Block(1,null,null,null).equals({id:1})).toBeFalsy();
		expect(new Block(1,null,null,null).equals(new Block(1,null,null,null))).toBeTruthy();
	});

});