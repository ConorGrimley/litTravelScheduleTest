describe("Math Type", function() {
  var mathObj;
  beforeEach(function(){
      mathObj = new MathType(34,12);
  });
  it("performs addition", function() {
    expect(mathObj.add()).toEqual(46);
  });
  it("performs subtraction", function() {
    expect(mathObj.subtract()).toEqual(22);
  });
  it("performs multiplication", function() {
    expect(mathObj.multiply()).toEqual(408);
  });
});


