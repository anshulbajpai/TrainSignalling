describe("Position Spec", function() {
	it("adds position",function() {
		expect(new Position(5,5).add(new Position(1,2))).toEqual(new Position(6,7));
	});

	it("tells if a position is less - only compares on x coordinates", function() {
		expect(new Position(5,5).isLessThan(new Position(6,4))).toBeTruthy();
		expect(new Position(5,5).isLessThan(new Position(4,4))).toBeFalsy();
		expect(new Position(5,5).isLessThan(new Position(5,4))).toBeFalsy();
	});

	it("tells if a position is greater - only compares on x coordinates", function() {
		expect(new Position(7,5).isGreaterThan(new Position(6,4))).toBeTruthy();
		expect(new Position(6,5).isGreaterThan(new Position(6,4))).toBeFalsy();
		expect(new Position(5,5).isGreaterThan(new Position(6,4))).toBeFalsy();
	});

	it("tells if two positions are equal",function() {
		expect(new Position(5,5).equals(null)).toBeFalsy();
		expect(new Position(5,5).equals(undefined)).toBeFalsy();
		expect(new Position(5,5).equals({x : 5, y : 5})).toBeFalsy();
		expect(new Position(5,5).equals(new Position(4,5))).toBeFalsy();
		expect(new Position(5,5).equals(new Position(5,4))).toBeFalsy();
		expect(new Position(5,5).equals(new Position(5,5))).toBeTruthy();
	});
});