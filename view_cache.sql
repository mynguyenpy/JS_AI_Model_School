Create View "111_QUERY" AS
SELECT 
  (
	SUBSTRING(
	  cast ("校系代碼" as varChar),1,3
	)
  ) AS schoolCode,
  trim (
	SUBSTRING(
	  "學校",
	  1,
	  POSITION('大學' IN "學校") + 1
	)
  ) AS schoolName,
  (
	cast ("校系代碼" AS varChar)
  ) AS deptCode,
  trim (
	SUBSTRING(
	  "學校",
	  POSITION('大學' IN "學校") + 2,
	  POSITION('(' IN "學校") - POSITION('大學' IN "學校") - 2
	)
  ) AS deptName,
  trim (
	SUBSTRING(
	  "學校",
	  POSITION('(' IN "學校") + 1,
	  POSITION(')' IN "學校") - POSITION('(' IN "學校") - 1
	)
  ) AS category
FROM public."Data_111"