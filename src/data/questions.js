import cn from './cn'
import ds from './ds'
import dbms from './dbms'
import os from './os'
import sd from './sd'
import algo from './algo'

export const levels = ['Beginner', 'Medium', 'Advanced']

export const subjects = [
  {
    "slug": "cn",
    "name": "Computer Networks",
    "short": "CN"
  },
  {
    "slug": "ds",
    "name": "Data Structures",
    "short": "DS"
  },
  {
    "slug": "dbms",
    "name": "Database Management Systems",
    "short": "DB"
  },
  {
    "slug": "os",
    "name": "Operating Systems",
    "short": "OS"
  },
  {
    "slug": "sd",
    "name": "System Design",
    "short": "SD"
  },
  {
    "slug": "algo",
    "name": "Algorithms",
    "short": "AL"
  }
]

// turns "level|question|answer|wrong|wrong|wrong" lines into question objects grouped by level
function parse(lines) {
  const byLevel = [[], [], []]
  for (const line of lines) {
    const [level, q, a, ...wrong] = line.split('|')
    byLevel[Number(level)].push({ q, a, wrong })
  }
  return byLevel
}

export const questions = {
  cn: parse(cn),
  ds: parse(ds),
  dbms: parse(dbms),
  os: parse(os),
  sd: parse(sd),
  algo: parse(algo),
}
