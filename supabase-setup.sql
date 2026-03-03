-- Enable Row Level Security (RLS) and Create Table
CREATE TABLE materials (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    grade TEXT NOT NULL,
    subject TEXT NOT NULL,
    unit TEXT NOT NULL,
    problem_pdf_path TEXT NOT NULL,
    answer_pdf_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Turn on Row Level Security
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view the materials)
CREATE POLICY "Allow public read access"
ON materials FOR SELECT
TO public
USING (true);

-- For this project, since there is no admin authentication yet, we will allow public insert/update/delete 
-- (Note: In a real production app, you should restrict this to authenticated admins only)
CREATE POLICY "Allow public insert"
ON materials FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update"
ON materials FOR UPDATE
TO public
USING (true);

CREATE POLICY "Allow public delete"
ON materials FOR DELETE
TO public
USING (true);
