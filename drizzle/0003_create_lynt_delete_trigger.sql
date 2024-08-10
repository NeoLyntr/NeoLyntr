-- Custom SQL migration file, put you code below! --
CREATE OR REPLACE FUNCTION update_lynts_before_delete()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM history WHERE lynt_id = OLD.id;

    UPDATE lynts
    SET content = content || chr(10)
    || 'The Lynt this user is reposting has been since deleted.',
        parent = NULL
    WHERE parent = OLD.id;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_lynts_before_delete_trigger
    BEFORE DELETE ON lynts
    FOR EACH ROW
    EXECUTE FUNCTION update_lynts_before_delete();
