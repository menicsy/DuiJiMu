var weatherInfo = {
	insert:'INSERT INTO weather_info(area, gender, height, weight, cloths, createtime) VALUES(?,?,?,?,?,?)',
  queryByPage: 'select * from weather_info where createtime >= ? LIMIT ?,4'
};

module.exports = weatherInfo;
