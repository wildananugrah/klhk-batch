CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP TABLE tbl_mst_submission_tmp;
CREATE TABLE "tbl_mst_submission_tmp" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" text NOT NULL,
    "content" bytea NOT NULL,
	"contentType" text NULL,
	"status" VARCHAR(20) NOT null default 'UN-CONVERTED',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX idx_tbl_mst_submission_tmp_status ON "tbl_mst_submission_tmp" ("status");

CREATE OR REPLACE FUNCTION insert_into_submission_tmp()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into tbl_mst_submission_tmp only if blobId is not null and exists in blobs table
    IF NEW."blobId" IS NOT NULL THEN
        INSERT INTO "tbl_mst_submission_tmp" ("name", "content", "contentType")
        SELECT NEW."name", b."content", b."contentType"
        FROM public.blobs b
        WHERE b.id = NEW."blobId";
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- END

CREATE TRIGGER trg_insert_submission_tmp
AFTER INSERT ON public.submission_attachments
FOR EACH ROW
EXECUTE FUNCTION insert_into_submission_tmp();

-- SEEDING
-- INSERT INTO public.tbl_mst_submission_tmp ("name", "content", "contentType")
-- SELECT s.name, 
--        b.content,
--        b."contentType"
-- FROM public.submission_attachments s
-- INNER JOIN public.blobs b ON s."blobId" = b.id
-- ORDER BY s."blobId" ASC