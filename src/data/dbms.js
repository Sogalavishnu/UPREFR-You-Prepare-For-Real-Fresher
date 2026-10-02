// Database Management Systems: one question per line as  level|question|right answer|wrong|wrong|wrong
// level 0 = Beginner, 1 = Medium, 2 = Advanced. Add more lines to grow the bank.
export default [
  "0|SQL command to fetch data?|SELECT|INSERT|UPDATE|DROP",
  "0|A primary key must be\u2026|Unique and not null|Repeatable|Optional|Text only",
  "0|Which clause filters rows?|WHERE|GROUP BY|ORDER BY|LIMIT",
  "1|The 'A' in ACID?|Atomicity|Availability|Accuracy|Access",
  "1|HAVING filters\u2026|Groups after GROUP BY|Rows before grouping|Columns|Tables",
  "1|LEFT JOIN returns\u2026|All left rows|Only matches|All right rows|No rows",
  "2|2NF removes\u2026|Partial dependencies|Transitive dependencies|Nulls|Indexes",
  "2|Which isolation level allows dirty reads?|Read Uncommitted|Serializable|Repeatable Read|Read Committed",
  "2|An index mainly speeds up\u2026|Lookups on indexed columns|Inserts|Backups|Schema changes",
  "0|Which command removes all rows quickly?|TRUNCATE|UPDATE|ALTER|SELECT",
  "0|A foreign key\u2026|References a key in another table|Must be unique|Stores files|Encrypts data",
  "0|Which command changes existing rows?|UPDATE|ALTER|INSERT|SELECT",
  "1|Which constraint blocks empty values?|NOT NULL|UNIQUE|DEFAULT|INDEX",
  "1|Which join pairs every row with every row?|CROSS JOIN|INNER JOIN|LEFT JOIN|SELF JOIN",
  "1|Which normal form removes transitive dependencies?|3NF|1NF|2NF|0NF",
  "1|GROUP BY is used to\u2026|Group rows for aggregates|Sort rows|Delete rows|Join tables",
  "2|Reading different values twice in one transaction is a\u2026|Non-repeatable read|Dirty write|Deadlock|Lost index",
  "2|A covering index\u2026|Holds every column a query needs|Indexes only the primary key|Is a backup|Is a view",
  "2|Which protocol commits across multiple databases?|Two-phase commit|Write-ahead only|Snapshot|Sharding",
]
