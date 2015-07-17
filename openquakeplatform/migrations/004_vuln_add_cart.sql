-- Migration created with db_dump diff between master and vuln_cart branches
--
-- Name: vulnerability_generalinformation_cart; Type: TABLE; Schema: public; Owner: oqplatform; Tablespace: 
--
CREATE TABLE vulnerability_generalinformation_cart (
    id integer NOT NULL,
    generalinformation_id integer NOT NULL,
    user_id integer NOT NULL
);

--
-- Name: vulnerability_generalinformation_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: oqplatform
--
CREATE SEQUENCE vulnerability_generalinformation_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: vulnerability_generalinformation_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oqplatform
--
ALTER SEQUENCE vulnerability_generalinformation_cart_id_seq OWNED BY vulnerability_generalinformation_cart.id;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: oqplatform
--
ALTER TABLE ONLY vulnerability_generalinformation_cart ALTER COLUMN id SET DEFAULT nextval('vulnerability_generalinformation_cart_id_seq'::regclass);

--
-- Data for Name: vulnerability_generalinformation_cart; Type: TABLE DATA; Schema: public; Owner: oqplatform
--
COPY vulnerability_generalinformation_cart (id, generalinformation_id, user_id) FROM stdin;
\.


--
-- Name: vulnerability_generalinformation_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: oqplatform
--
SELECT pg_catalog.setval('vulnerability_generalinformation_cart_id_seq', 1, false);

--
-- Name: vulnerability_generalinformat_generalinformation_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: oqplatform; Tablespace: 
--
ALTER TABLE ONLY vulnerability_generalinformation_cart
    ADD CONSTRAINT vulnerability_generalinformat_generalinformation_id_user_id_key UNIQUE (generalinformation_id, user_id);

--
-- Name: vulnerability_generalinformation_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: oqplatform; Tablespace: 
--
ALTER TABLE ONLY vulnerability_generalinformation_cart
    ADD CONSTRAINT vulnerability_generalinformation_cart_pkey PRIMARY KEY (id);

--
-- Name: vulnerability_generalinformation_cart_generalinformation_id; Type: INDEX; Schema: public; Owner: oqplatform; Tablespace: 
--
CREATE INDEX vulnerability_generalinformation_cart_generalinformation_id ON vulnerability_generalinformation_cart USING btree (generalinformation_id);

--
-- Name: vulnerability_generalinformation_cart_user_id; Type: INDEX; Schema: public; Owner: oqplatform; Tablespace: 
--
CREATE INDEX vulnerability_generalinformation_cart_user_id ON vulnerability_generalinformation_cart USING btree (user_id);

--
-- Name: generalinformation_id_refs_id_d2346e7e; Type: FK CONSTRAINT; Schema: public; Owner: oqplatform
--
ALTER TABLE ONLY vulnerability_generalinformation_cart
    ADD CONSTRAINT generalinformation_id_refs_id_d2346e7e FOREIGN KEY (generalinformation_id) REFERENCES vulnerability_generalinformation(id) DEFERRABLE INITIALLY DEFERRED;

--
-- Name: vulnerability_generalinformation_cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: oqplatform
--
ALTER TABLE ONLY vulnerability_generalinformation_cart
    ADD CONSTRAINT vulnerability_generalinformation_cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;

