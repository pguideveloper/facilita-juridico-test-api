-- Table: public.customer

-- DROP TABLE IF EXISTS public.customer;

CREATE TABLE IF NOT EXISTS public.customer
(
    name text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    coordinates json,
    id uuid
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customer
    OWNER to docker;