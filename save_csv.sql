copy public."Data_111"(
	"校系代碼",
	"學校",
	"正取總人數",
	"備取總人數",
	"原住民正取總人數",
	"正取錄取人數",
	"備取錄取人數",
	"原住民正取錄取人數",
	"報到人數","名額空缺",
	"招生名額",
	"正取有效性",
	"正備取有效性"
)
FROM 'D:/Win Default/Downloads/111.csv'
WITH(FORMAT csv, DELIMITER ',', HEADER, ENCODING 'UTF8', ON_ERROR ignore, LOG_VERBOSITY default);