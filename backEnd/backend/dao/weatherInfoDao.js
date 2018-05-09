var mysql = require('mysql');
var $conf = require('../baseDao/db');
var $sql = require('./weatherInfoSqlMapping');

var pool  = mysql.createPool($conf.mysql);

module.exports = {
    add: function (param, res) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.insert, [param.areaSelect, param.genderSelect, param.heightSelect, param.weightSelect, param.cloths, param.weatherTime], function(err, result) {
                if(result) {
                    res.json({
                        code: 200,
                        msg:'新增成功'
                    });
                }else{
                    res.json({
                        code: 405,
                        msg:'新增失败'
                    });
				}
                connection.release();
            });
        });
    },
    queryByPage: function (param, res) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByPage, [param.currentTime, (param.pageIndex-1)*4],  function(err, result) {
                if(result) {
                    res.json(result);
                }else{
                    res.json({
                        code: 405,
                        msg:'查询失败'
                    });
                }
                connection.release();
            });
        });
    }

};