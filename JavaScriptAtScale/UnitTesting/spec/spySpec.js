describe("Spying on functions", function() {
  it("spying on methods with call through", function() {
    function mathTest(input) {
        var result1 = input.add();
        var result2 = input.subtract();
        return result1 + result2;
    }
    var mathObj = new MathType(34,12);
    spyOn(mathObj, 'add').and.callThrough();
    spyOn(mathObj, 'subtract').and.callThrough();
    spyOn(mathObj, 'multiply');
    
    var result = mathTest(mathObj);
    expect(result).toBe(68);
    expect(mathObj.add).toHaveBeenCalled();
    expect(mathObj.subtract).toHaveBeenCalled();
    expect(mathObj.multiply).not.toHaveBeenCalled();
  });
  it("spying on methods altering return values", function() {
    function mathTest(input) {
        var result1 = input.add();
        var result2 = input.subtract();
        return result1 + result2;
    }
    var mathObj = new MathType(34,12);
    spyOn(mathObj, 'add').and.returnValue(123);
    spyOn(mathObj, 'subtract').and.returnValue(456);
    spyOn(mathObj, 'multiply');
    
    var result = mathTest(mathObj);
    expect(result).toBe(579);
    expect(mathObj.add).toHaveBeenCalled();
    expect(mathObj.subtract).toHaveBeenCalled();
    expect(mathObj.multiply).not.toHaveBeenCalled();
  });
  it("checking inputs", function() {
      var mathObj = new MathType(34,12);
      spyOn(mathObj, 'join').and.callThrough();
      
      var result = mathObj.join('-');
      expect(result).toBe('34-12');
      expect(mathObj.join).toHaveBeenCalledWith('-');
      expect(mathObj.join).not.toHaveBeenCalledWith('#');
  });
  it("replacing a methods implementation", function() {
      var mathObj = new MathType(34,12);
      var addRetval = 5;
      var subtractRetval = 7;
      
      spyOn(mathObj, 'add')
              .and.callFake(function() { return addRetval++; });
      spyOn(mathObj, 'subtract')
              .and.callFake(function() { return subtractRetval--; });
      
      expect(mathObj.add()).toBe(5);
      expect(mathObj.add()).toBe(6);
      expect(mathObj.add()).toBe(7);
      
      expect(mathObj.subtract()).toBe(7);
      expect(mathObj.subtract()).toBe(6);
      expect(mathObj.subtract()).toBe(5);
  });
});


