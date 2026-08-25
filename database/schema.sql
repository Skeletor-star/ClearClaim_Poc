CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('client', 'support', 'admin');
CREATE TYPE claim_type AS ENUM ('before_treatment', 'after_treatment', 'denied_appeal');
CREATE TYPE claim_status AS ENUM ('draft', 'submitted', 'analysing', 'completed', 'rejected');
CREATE TYPE document_type AS ENUM ('policy','bill','discharge_summary','prescription','lab_report','denial_letter','claim_form','other');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    role user_role DEFAULT 'client',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    claim_type claim_type NOT NULL,
    status claim_status DEFAULT 'draft',
    ai_decision VARCHAR,
    ai_summary TEXT,
    estimated_amount FLOAT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR NOT NULL,
    file_path VARCHAR NOT NULL,
    doc_type document_type DEFAULT 'other',
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR NOT NULL,
    detail TEXT,
    ip_address VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
    file_path VARCHAR NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_claims_user_id ON claims(user_id);
CREATE INDEX idx_documents_claim_id ON documents(claim_id);
