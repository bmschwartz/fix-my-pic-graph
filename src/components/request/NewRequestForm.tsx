import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import { FMPButton, FMPTypography } from '@/components';

const NewRequestForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 700,
        margin: 'auto',
        padding: 4,
        borderRadius: 2,
        boxShadow: 4,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FMPTypography
        variant="h6"
        gutterBottom
        sx={{
          marginBottom: 3,
          position: 'relative',
          paddingBottom: 1,
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            width: '50%',
            height: '4px',
            backgroundColor: '#000000',
            borderRadius: '2px',
          },
          fontWeight: 'bold',
          letterSpacing: '0.1em',
        }}
      >
        Create a New Request
      </FMPTypography>
      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
          />
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
            sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
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
            sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FMPButton variant="contained" component="label" sx={{ width: '100%' }}>
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </FMPButton>
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
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 0,
                  paddingBottom: '56.25%',
                  position: 'relative',
                }}
              >
                <Image src={preview} alt="Image preview" layout="fill" objectFit="contain" />
              </Box>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <FMPButton type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Create Request
          </FMPButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewRequestForm;
