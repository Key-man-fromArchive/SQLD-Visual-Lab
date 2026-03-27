// @TASK P4-R1-T2 - SQL 데이터 타입 용어 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Term } from '@/types'

export const datatypeTerms: Term[] = [
  {
    id: 'char-varchar',
    name: 'CHAR vs VARCHAR',
    category: 'DATATYPE',
    definition: '문자 데이터를 저장하는 타입입니다. CHAR는 고정 길이(선언된 크기만큼 공간 사용), VARCHAR는 가변 길이(실제 데이터 길이만큼 공간 사용)입니다.',
    syntax: 'CHAR(길이) - 고정 길이 문자\nVARCHAR(길이) / VARCHAR2(길이) - 가변 길이 문자',
    exampleSQL: "CREATE TABLE employees (\n  gender CHAR(1),\n  email VARCHAR(100),\n  phone_number VARCHAR2(20)\n);",
    exampleResult: 'gender는 항상 1바이트 고정, email은 최대 100바이트이지만 실제 입력값 길이만 사용합니다.',
    relatedTerms: ['clob', 'blob', 'number'],
  },
  {
    id: 'number',
    name: 'NUMBER / INTEGER',
    category: 'DATATYPE',
    definition: '숫자 데이터를 저장하는 타입입니다. NUMBER는 정수/소수 모두 저장 가능한 포괄적 타입이고, INTEGER는 정수만 저장합니다.',
    syntax: 'NUMBER - 숫자 (정수/소수)\nNUMBER(전체자릿수, 소수자릿수) - 정밀도 지정\nINTEGER - 정수만\nFLOAT - 부동소수점\nDECIMAL(자릿수, 소수자릿수) - 정밀한 소수',
    exampleSQL: "CREATE TABLE products (\n  product_id INTEGER PRIMARY KEY,\n  price NUMBER(10, 2),\n  quantity NUMBER(5),\n  rating FLOAT\n);",
    exampleResult: 'product_id는 정수, price는 정수 부분 8자리와 소수점 이하 2자리, quantity는 최대 5자리 정수, rating은 부동소수점입니다.',
    relatedTerms: ['char-varchar', 'date-time', 'clob'],
  },
  {
    id: 'date-time',
    name: 'DATE / DATETIME / TIMESTAMP',
    category: 'DATATYPE',
    definition: '날짜와 시간 데이터를 저장하는 타입입니다. DATE는 날짜만, DATETIME/TIMESTAMP는 날짜와 시간을 함께 저장합니다.',
    syntax: 'DATE - 날짜 (YYYY-MM-DD)\nDATETIME / TIMESTAMP - 날짜와 시간\nTIME - 시간만 (HH:MM:SS)',
    exampleSQL: "CREATE TABLE orders (\n  order_id INTEGER PRIMARY KEY,\n  order_date DATE,\n  created_at DATETIME,\n  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
    exampleResult: 'order_date는 날짜만, created_at과 updated_at은 날짜와 시간을 모두 저장합니다.',
    relatedTerms: ['char-varchar', 'number', 'clob'],
  },
  {
    id: 'clob',
    name: 'CLOB / BLOB',
    category: 'DATATYPE',
    definition: '대용량 데이터를 저장하는 타입입니다. CLOB(Character Large Object)은 텍스트, BLOB(Binary Large Object)은 이진 데이터를 저장합니다.',
    syntax: 'CLOB - 대용량 텍스트 (최대 4GB)\nBLOB - 대용량 이진 데이터 (최대 4GB)',
    exampleSQL: "CREATE TABLE documents (\n  doc_id INTEGER PRIMARY KEY,\n  doc_content CLOB,\n  doc_file BLOB,\n  created_at DATE\n);",
    exampleResult: 'doc_content는 길이 제한 없는 텍스트, doc_file은 이미지/파일 같은 이진 데이터를 저장할 수 있습니다.',
    relatedTerms: ['char-varchar', 'number', 'date-time'],
  },
  {
    id: 'boolean',
    name: 'BOOLEAN',
    category: 'DATATYPE',
    definition: '참(TRUE) 또는 거짓(FALSE) 값을 저장하는 타입입니다. SQL Server에서는 BIT(0 또는 1)를 사용하며, PostgreSQL은 BOOLEAN을 지원합니다.',
    syntax: 'BOOLEAN - 참/거짓 (PostgreSQL)\nBIT - 0 또는 1 (SQL Server)',
    exampleSQL: "CREATE TABLE users (\n  user_id INTEGER PRIMARY KEY,\n  is_active BOOLEAN,\n  is_admin BOOLEAN DEFAULT FALSE,\n  email_verified BOOLEAN\n);",
    exampleResult: 'is_active, is_admin, email_verified는 참/거짓 값을 저장합니다.',
    relatedTerms: ['char-varchar', 'number', 'date-time'],
  },
]
