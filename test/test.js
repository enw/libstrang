var Strang = require('../index'),
    Matrix = Strang.Matrix;

var row = new Matrix( [1,4,1,1,1] ),
    col = new Matrix( [1], [3], [1], [1], [1] ),
    matrix = new Matrix (
        [1, 2, 3, 4, 5],
        [10,30,12,51,51],
        [0,0,0,0,4]
    )
    ;

console.log("row\n", row.toString());
for (var i=1;i<=3;i++) { console.log("get(1,",i,")\n", row.get(1,i)) }
console.log("col\n", col.toString());
for (var i=1;i<=3;i++) { console.log("get(",i,",1)\n", col.get(i,1)) }
console.log("scalarMultiples\n", row.multiply(2).toString(), col.multiply(2).toString());
console.log("matrix\n", matrix.toString());
console.log("matrix row 2\n", matrix.getRow(2));
console.log("matrix col 2\n", matrix.getColumn(2));
console.log("dot product of column and row\n", row.multiply(col).toString());
console.log("dot product of matrix and row\n", matrix.multiply(col).toString());
console.log("identity\n", Matrix.identity(3).toString());

// swap rows
var swapperMatrix = Matrix.identity(3);
swapperMatrix.swapRows(1,2);
console.log("row swapper\n", swapperMatrix.toString());

swapperMatrix.swapColumns(2,3);
console.log("column swapper\n", swapperMatrix.toString());

// let's multiply some stuff
var bitmap = new Matrix (
    [1,1,0,0],
    [1,0,1,0],
    [1,0,0,1],
    [1,0,1,0]
    ),
    identity = Matrix.identity(4)
;

console.log("bitmap\n", bitmap.toString());
console.log("identity\n", identity.toString());
console.log("identity * bitmap\n", identity.multiply(bitmap).toString());
console.log("bitmap * identity\n", bitmap.multiply(identity).toString());

bitmap.swapRows(3,4);
console.log("after swap(3,4)\n", bitmap.toString());

bitmap.set(3,4,444);
console.log("after set(3,4,444)\n", bitmap.toString());

console.log("zero\n", Matrix.zero(4).toString());

// swap rows
var A = new Matrix([1,2,3],[4,5,6],[7,8,9]);
var B = new Matrix([0,1,0],[1,0,0],[0,0,1]);

// swap columns
console.log(A.multiply(B).toString());

// swap rows
console.log(B.multiply(A).toString());
