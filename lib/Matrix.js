var _=require('underscore');

/* Matrix */
function Matrix () {
    // set up internal representation of Matrix
    var data = [];
    this.init = function () {
        _.each(arguments, function(row, index) {
            // TODO: handle lists, ints and constants differently
            data[index]=row 
        });
    }
    this.init.apply(this,arguments);

    // get value (1-based indexing)
    this.get = function(row, col) {
        return data[row-1][col-1];
    };
    // set value (1-based indexing)
    this.set = function(row, col, value) {
        data[row-1][col-1] = value;
    };
    // get array of data in 1-based row
    this.getRow = function(row) {
        return data[row-1]
    }
    // get number of rows
    this.getRowCount = function() {
        return data.length;
    }
    // get array of data in 1-based column
    this.getColumn = function(col) {
        var ret=[];
        _.each(data, function(row) {
            ret.push(row[col-1]);
        });
        return ret;
    }
    // get number of columns
    this.getColumnCount = function() {
        return data[0].length;
    }
    // multiply matrixes or multiple by a scalar
    this.multiply = function( right ) {
        if (right instanceof Matrix) {
            // dot product
            // if A is 3x4 (3 rows, 4 columns) and B is 4x2 then product will be 3x2
            // i.e. m*n X n*p ->m*p
            // (rows of the first & columns of the second)

            // create args for new matrix
            var args = [];
            
            // iterate through our rows (in A) and columns (in B) to get fields of C
            var columnCount = right.getColumnCount();
            _.each(data, function (row, index) {
                var theRow = row;
                var newRow = [];
                for (var i=1;i<=columnCount;i++) {
                    var theColumn = right.getColumn(i);
                    // now we have the rows
                    var CValue = 0;
                    for (var j=0;j<theColumn.length;j++) {
                        CValue += theColumn[j] * theRow[j];
                    }
                    newRow.push(CValue);
//                    console.log("MULTIPLY ROW", theRow, "AND COLUMN", theColumn, CValue);
                }
                args.push(newRow);
            });
            
            // make new Matrix (potential leak...?)
            var matrix = new Matrix();
            matrix.init.apply(matrix, args);
            return matrix;
        } else {
            // Ax=B
             _.each(data, function (row) {
                 _.each(row, function ( datum, index, row ) {
                     row[index] = datum * right;
                 });
             });
             return this;
        }
    }
    this.length = function() { return arguments.length + 1}
    this.toString = function() {
        var s="";
         _.each(data, function(row) { 
         s += "|\t";
             _.each(row, function( datum ) {
                 s+=datum+"\t"; 
             });
             s += "|\n"
             
         });
         return s;
    }

    // swap rows
    // mutates the object
    // rows are 1-based - thanks, linear algebra people!
    this.swapRows = function(a,b) {
        var tmp = data[a-1];
        data[a-1] = data[b-1];
        data[b-1] = tmp;
    }

    // swap columns
    // mutates the object
    // columns are 1-based - thanks, linear algebra people!
    this.swapColumns = function(a,b) {
        _.each(data, function(row) {
            var tmp = row[a-1];
            row[a-1] = row[b-1];
            row[b-1] = tmp;
        });
    }
}
// generate identity matrix
Matrix.identity = Matrix.prototype.identity = function(size) {
    var args = [];
    for (var i=0;i<size;i++) {
        var row = [];
        for (var j=0;j<size;j++) {
            row.push((i==j)?1:0);
        }
        args.push(row);
    }
    // create new Matrix
    var matrix = new Matrix();
    
    // initialize and return
    matrix.init.apply(matrix,args);
    return matrix;
}
// generate zero matrix
Matrix.zero = Matrix.prototype.zero = function(size) {
    var args = [];
    for (var i=0;i<size;i++) {
        var row = [];
        for (var j=0;j<size;j++) {
            row.push(0);
        }
        args.push(row);
    }
    // create new Matrix
    var matrix = new Matrix();
    
    // initialize and return
    matrix.init.apply(matrix,args);
    return matrix;
}


module.exports = Matrix;
