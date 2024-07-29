import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

const NewRequestForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  // const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 3,
        borderRadius: 1,
        boxShadow: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Create a New Request
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              inputProps: { step: '0.01' },
              type: 'number',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Grid>
        {preview && (
          <Grid item xs={12}>
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Image Preview:
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 0,
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  position: 'relative',
                }}
              >
                <Image src={preview} alt="Image preview" layout="fill" objectFit="contain" />
              </Box>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Request
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewRequestForm;
