function MathType(no1, no2) {
    this.no1 = no1;
    this.no2 = no2;
}
MathType.prototype.add = function() {
                            return this.no1 + this.no2;
                         };
MathType.prototype.subtract = function() {
                                return this.no1 - this.no2;
                              };
MathType.prototype.multiply = function() {
                                return this.no1 * this.no2;
                              };
MathType.prototype.join = function(spacer) {
                            return this.no1 + spacer + this.no2;
                          };                     

