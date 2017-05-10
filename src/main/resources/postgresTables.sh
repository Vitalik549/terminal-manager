#!/usr/bin/env bash

createdb clm-db
\c mydb

CREATE TABLE job(ID INT PRIMARY KEY     NOT NULL, NAME           TEXT    NOT NULL,  DESCRIPTION TEXT NOT NULL);

ALTER TABLE job ALTER id SET DEFAULT NEXTVAL('user_id_seq');

# example
# psql postgres -c "CREATE DATABASE mytemplate1 WITH ENCODING 'UTF8' TEMPLATE template0"



ALTER TABLE job alter column description drop not null;

CREATE TABLE groups(ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, NAME  TEXT NOT NULL,  DESCRIPTION TEXT NOT NULL);


ALTER TABLE groups ALTER id SET DEFAULT NEXTVAL('user_id_seq');


CREATE TABLE job_group(ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, NAME  TEXT NOT NULL,  DESCRIPTION TEXT NOT NULL);


CREATE TABLE jobs_groups(
    group_id int NOT NULL REFERENCES groups (id) ON UPDATE CASCADE ON DELETE CASCADE,
    job_id int NOT NULL REFERENCES jobs (id) ON UPDATE CASCADE,
    PRIMARY KEY (job_id, group_id)
);

CREATE TABLE bill_product (
  bill_id    int REFERENCES bill (bill_id) ON UPDATE CASCADE ON DELETE CASCADE
, product_id int REFERENCES product (product_id) ON UPDATE CASCADE
, amount     numeric NOT NULL DEFAULT 1
, CONSTRAINT bill_product_pkey PRIMARY KEY (bill_id, product_id)  -- explicit pk
);


SEQUENCES
SELECT * FROM information_schema.sequences;
CREATE SEQUENCE user_id_seq;
CREATE SEQUENCE jobs_groups_id_seq;


alter table jobs add column position int  REFERENCES groups (id) ON UPDATE CASCADE ON DELETE CASCADE;
alter table jobs add column position int  not null;
alter table jobs alter column position set not null;
\d+ jobs





