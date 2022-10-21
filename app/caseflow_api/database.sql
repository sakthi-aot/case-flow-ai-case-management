CREATE TABLE Document (
    content varchar NULL,
    contentsize int4 NULL,
    contenttype varchar NULL,
    creationdate timestamp NULL,
    creationuser varchar NULL,
    description varchar NULL,
    downloadurl varchar NULL,
    id serial4 NOT NULL,
    documentid varchar NULL,
    latestversion varchar NULL,
    metadata varchar NULL,
    modificationdate timestamp NULL,
    modificationuser varchar NULL,
    name varchar NULL,
    CONSTRAINT document_pk PRIMARY KEY (id),
    CONSTRAINT document_un UNIQUE (documentid)
);
CREATE TABLE versions (
    id serial4 NOT NULL,
    docid int4 NULL,
    versions varchar NULL,
    creationdate timestamp NULL,
    modificationdate timestamp NULL,
    documentid varchar NULL,
    CONSTRAINT versions_pk PRIMARY KEY (id),
    CONSTRAINT versions_fk FOREIGN KEY (docid) REFERENCES Document(id)
);
