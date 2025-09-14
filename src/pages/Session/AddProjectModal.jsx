
// AddProjectModal.jsx
import React from 'react';
import styled from 'styled-components';
import { X, Folder, Image, Hash } from 'lucide-react';
import Modal from './Modal';
import { useForm } from 'react-hook-form';
import {AddSession} from '../../Authentication/addSession';
import useUser from '../../Authentication/useUser';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: white;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Input = styled.input`
  padding: 12px;
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid ${props => props.hasError ? 'rgba(239, 68, 68, 0.8)' : 'rgba(71, 85, 105, 0.5)'};
  border-radius: 8px;
  color: white;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? 'rgba(239, 68, 68, 0.8)' : 'rgba(139, 92, 246, 0.8)'};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 92, 246, 0.2)'};
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid ${props => props.hasError ? 'rgba(239, 68, 68, 0.8)' : 'rgba(71, 85, 105, 0.5)'};
  border-radius: 8px;
  color: white;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? 'rgba(239, 68, 68, 0.8)' : 'rgba(139, 92, 246, 0.8)'};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 92, 246, 0.2)'};
  }
`;

const ColorPickerWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${props => props.selected ? 'white' : 'transparent'};
  background: ${props => props.color};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  background: rgba(51, 65, 85, 0.5);
  color: rgb(226, 232, 240);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: rgba(51, 65, 85, 0.7);
  }
`;

const ErrorMsg = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 4px;
`;

const ColorPresets = [
  { name: 'Purple', value: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)' },
  { name: 'Green', value: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
  { name: 'Orange', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  { name: 'Red', value: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
  { name: 'Pink', value: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' },
  { name: 'Indigo', value: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }
];

const AddProjectModal = ({ isOpen, onClose }) => {
  const {addSession, isAdding} = AddSession()
  const {user} = useUser()
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      color: ColorPresets[0].value
    }
  });

  const selectedColor = watch('color', ColorPresets[0].value);

  const onSubmit = (data) => {
    console.log('Project data:', data);
    addSession({ name: data.name, description: data.description, color: data.color, ownerId: user.id });
    reset();
    onClose();
  };

  const handleColorSelect = (colorValue) => {
    setValue('color', colorValue, { shouldValidate: true });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Project">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Project Name */}
        <FormGroup>
          <Label htmlFor="name">
            <Hash size={16} />
            Project Name *
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter project name"
            hasError={!!errors.name}
            {...register("name", { 
              required: "Project name is required",
              minLength: {
                value: 3,
                message: "Project name must be at least 3 characters"
              },
              maxLength: {
                value: 50,
                message: "Project name must be less than 50 characters"
              }
            })}
          />
          {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
        </FormGroup>

        {/* Description */}
        <FormGroup>
          <Label htmlFor="description">
            <Folder size={16} />
            Description
          </Label>
          <TextArea
            id="description"
            placeholder="Describe your project..."
            hasError={!!errors.description}
            {...register("description", { 
              required: "Project description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters"
              },
              maxLength: {
                value: 500,
                message: "Description must be less than 500 characters"
              }
            })}
          />
          {errors.description && <ErrorMsg>{errors.description.message}</ErrorMsg>}
        </FormGroup>

        {/* Color */}
        <FormGroup>
          <Label>
            <Image size={16} />
            Project Color *
          </Label>
          <ColorPickerWrapper>
            {ColorPresets.map((preset, index) => (
              <ColorOption
                key={index}
                color={preset.value}
                selected={selectedColor === preset.value}
                title={preset.name}
                onClick={() => handleColorSelect(preset.value)}
              />
            ))}
          </ColorPickerWrapper>
          <input 
            type="hidden" 
            {...register("color", { 
              required: "Please select a project color" 
            })} 
          />
          {errors.color && <ErrorMsg>{errors.color.message}</ErrorMsg>}
        </FormGroup>

        {/* Buttons */}
        <ButtonGroup>
          <SecondaryButton type="button" onClick={handleClose}>
            <X size={16} />
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={isAdding}>
            <Folder size={16} />
            Create Project
          </PrimaryButton>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default AddProjectModal;