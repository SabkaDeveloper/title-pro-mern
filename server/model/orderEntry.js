const createOrderEntryTable = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS order_entries (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(255) UNIQUE NOT NULL,
        open_date TIMESTAMP NOT NULL,
        closed_date TIMESTAMP NULL,
        due_date TIMESTAMP NULL,
        arrival_date TIMESTAMP NOT NULL,
        delivery_date TIMESTAMP NULL,
        active_workflow VARCHAR(255) NOT NULL,
        assigned_to VARCHAR(255),
        street_address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(100) NOT NULL,
        county VARCHAR(100) NOT NULL,
        zip_code VARCHAR(20) NOT NULL,
        product_type VARCHAR(255) NOT NULL,
        transaction_type VARCHAR(255) NOT NULL,
        workflow_group VARCHAR(255) NOT NULL,
        data_source VARCHAR(255) NOT NULL,
        land_value FLOAT DEFAULT 0.0,
        improvement_value FLOAT DEFAULT 0.0,
        total_assessed_value FLOAT DEFAULT 0.0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      );
    `;
  
    const functionQuery = `
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_timestamp') THEN
          CREATE FUNCTION update_timestamp() RETURNS TRIGGER AS $$
          BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;
        END IF;
      END $$;
    `;
  
    const triggerQuery = `
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_timestamp') THEN
          CREATE TRIGGER set_timestamp
          BEFORE UPDATE ON order_entries
          FOR EACH ROW
          EXECUTE FUNCTION update_timestamp();
        END IF;
      END $$;
    `;
  
    try {
      await pool.query(query);        // Create table
      await pool.query(functionQuery); // Create function only if it doesn't exist
      await pool.query(triggerQuery);  // Create trigger only if it doesn't exist
      console.log("✅ OrderEntry table and triggers created successfully");
    } catch (error) {
      console.error("❌ Error creating OrderEntry table:", error);
    }
  };
  