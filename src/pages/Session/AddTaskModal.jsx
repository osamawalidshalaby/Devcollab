// // AddTaskModal.jsx
// import React from 'react';
// import styled from 'styled-components';
// import { X, AlertCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
// import Modal from './Modal';
// import { useAddNewTask } from '../../Authentication/useTasks';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import useUser from '../../Authentication/useUser';

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const FormRow = styled.div`
//   display: flex;
//   gap: 16px;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const Label = styled.label`
//   font-weight: 600;
//   color: white;
//   font-size: 0.875rem;
// `;

// const Input = styled.input`
//   padding: 12px;
//   background: rgba(51, 65, 85, 0.3);
//   border: 1px solid rgba(71, 85, 105, 0.5);
//   border-radius: 8px;
//   color: white;
//   font-size: 14px;
  
//   &:focus {
//     outline: none;
//     border-color: rgba(139, 92, 246, 0.8);
//   }
// `;

// const TextArea = styled.textarea`
//   padding: 12px;
//   background: rgba(51, 65, 85, 0.3);
//   border: 1px solid rgba(71, 85, 105, 0.5);
//   border-radius: 8px;
//   color: white;
//   font-size: 14px;
//   min-height: 100px;
//   resize: vertical;
  
//   &:focus {
//     outline: none;
//     border-color: rgba(139, 92, 246, 0.8);
//   }
// `;

// const Select = styled.select`
//   padding: 12px;
//   background: rgba(51, 65, 85, 0.3);
//   border: 1px solid rgba(71, 85, 105, 0.5);
//   border-radius: 8px;
//   color: white;
//   font-size: 14px;
//   appearance: none;
//   flex: 1;
//   width: 150px;
  
//   &:focus {
//     outline: none;
//     border-color: rgba(139, 92, 246, 0.8);
//   }
  
//   option {
//     background: rgba(30, 41, 59, 0.9);
//   }
// `;

// const SelectWrapper = styled.div`
//   position: relative;
//   flex: 1;
  
//   svg {
//     position: absolute;
//     right: 12px;
//     top: 50%;
//     transform: translateY(-50%);
//     color: rgb(148, 163, 184);
//     pointer-events: none;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 12px;
//   justify-content: flex-end;
//   margin-top: 16px;
// `;

// const PrimaryButton = styled.button`
//   background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
//   color: white;
//   border: none;
//   border-radius: 8px;
//   padding: 10px 20px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
//   }
  
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

// const SecondaryButton = styled.button`
//   background: rgba(51, 65, 85, 0.5);
//   color: rgb(226, 232, 240);
//   border: 1px solid rgba(71, 85, 105, 0.5);
//   border-radius: 8px;
//   padding: 10px 20px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
  
//   &:hover {
//     background: rgba(51, 65, 85, 0.7);
//   }
// `;

// const ErrorMessage = styled.span`
//   color: #ef4444;
//   font-size: 0.75rem;
//   margin-top: 4px;
// `;

// const AddTaskModal = ({ isOpen, onClose }) => {
//   const {id} = useParams()
//   const {user} = useUser()
//   const { register, handleSubmit, formState: { errors }, reset } = useForm({
//     defaultValues: {
//       title: 'Nav Bar',
//       description: 'Bulid Nav Bar',
//       priority: 'medium',
//       status: 'pending'
//     }
//   });
  
//   const { addtask, isAdding } = useAddNewTask();

//   const onSubmit = (data) => {
//   addtask(
//     {
//       sessionId: id,
//       userId: user.id,
//       title: data.title,
//       description: data.description,
//       status: data.status,
//       priority: data.priority,
//     },
//     {
//       onSuccess: () => {
//         reset();
//         onClose();
//       },
//     }
//   );
// };

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'completed': return <CheckCircle size={14} />;
//       case 'in-progress': return <Clock size={14} />;
//       default: return <AlertTriangle size={14} />;
//     }
//   };

//   const handleCancel = () => {
//     reset();
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={handleCancel} title="Add New Task">
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <FormGroup>
//           <Label htmlFor="title">Task Title *</Label>
//           <Input
//             type="text"
//             id="title"
//             placeholder="Enter task title"
//             {...register("title", { 
//               required: "Task title is required",
//               minLength: {
//                 value: 3,
//                 message: "Title must be at least 3 characters"
//               }
//             })}
//           />
//           {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
//         </FormGroup>
        
//         <FormGroup>
//           <Label htmlFor="description">Description</Label>
//           <TextArea
//             id="description"
//             placeholder="Describe the task in detail..."
//             {...register("description")}
//           />
//         </FormGroup>
        
//         <FormRow>
//           <FormGroup>
//             <Label htmlFor="priority">Priority</Label>
//             <SelectWrapper>
//               <Select
//                 id="priority"
//                 {...register("priority")}
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </Select>
//               <AlertCircle size={16} />
//             </SelectWrapper>
//           </FormGroup>
          
//           <FormGroup>
//             <Label htmlFor="status">Status</Label>
//             <SelectWrapper>
//               <Select
//                 id="status"
//                 {...register("status")}
//               >
//                 <option value="pending">Pending</option>
//                 <option value="in-progress">In Progress</option>
//                 <option value="completed">Completed</option>
//               </Select>
//               {getStatusIcon("pending")}
//             </SelectWrapper>
//           </FormGroup>
//         </FormRow>
        
//         <ButtonGroup>
//           <SecondaryButton type="button" onClick={handleCancel}>
//             Cancel
//           </SecondaryButton>
//           <PrimaryButton type="submit" disabled={isAdding}>
//             {isAdding ? 'Creating...' : 'Create Task'}
//           </PrimaryButton>
//         </ButtonGroup>
//       </Form>
//     </Modal>
//   );
// };

// export default AddTaskModal;

// AddTaskModal.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AlertCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import { useAddNewTask, useUpdateTask } from '../../Authentication/useTasks';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: white;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 12px;
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: rgba(139, 92, 246, 0.8);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: rgba(139, 92, 246, 0.8);
  }
`;

const Select = styled.select`
  padding: 12px;
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  appearance: none;
  flex: 1;
  width: 150px;
  
  &:focus {
    outline: none;
    border-color: rgba(139, 92, 246, 0.8);
  }
  
  option {
    background: rgba(30, 41, 59, 0.9);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  flex: 1;
  
  svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: rgb(148, 163, 184);
    pointer-events: none;
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
  
  &:hover {
    background: rgba(51, 65, 85, 0.7);
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 4px;
`;

const AddTaskModal = ({ isOpen, onClose, task }) => {
  const {id} = useParams()
  const {user} = useUser()
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  
  const { addtask, isAdding } = useAddNewTask();
  const { updateTask, isUpdating } = useUpdateTask();

  // تعبئة النموذج ببيانات المهمة عند فتحه للتعديل
  useEffect(() => {
    if (task) {
      setValue('title', task.title);
      setValue('description', task.description || '');
      setValue('priority', task.priority);
      setValue('status', task.status);
    } else {
      // إعادة تعيين النموذج لقيم افتراضية عند إنشاء مهمة جديدة
      reset({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending'
      });
    }
  }, [task, setValue, reset]);

  const onSubmit = (data) => {
    if (task) {
      // تحديث المهمة الموجودة
      updateTask(
        {
          id: task.id,
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      // إنشاء مهمة جديدة
      addtask(
        {
          sessionId: id,
          userId: user.id,
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={14} />;
      case 'in-progress': return <Clock size={14} />;
      default: return <AlertTriangle size={14} />;
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={task ? "Edit Task" : "Add New Task"}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="title">Task Title *</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter task title"
            {...register("title", { 
              required: "Task title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters"
              }
            })}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            placeholder="Describe the task in detail..."
            {...register("description")}
          />
        </FormGroup>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="priority">Priority</Label>
            <SelectWrapper>
              <Select
                id="priority"
                {...register("priority")}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
              <AlertCircle size={16} />
            </SelectWrapper>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <SelectWrapper>
              <Select
                id="status"
                {...register("status")}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
              {getStatusIcon("pending")}
            </SelectWrapper>
          </FormGroup>
        </FormRow>
        
        <ButtonGroup>
          <SecondaryButton type="button" onClick={handleCancel}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={isAdding || isUpdating}>
            {task 
              ? (isUpdating ? 'Updating...' : 'Update Task') 
              : (isAdding ? 'Creating...' : 'Create Task')}
          </PrimaryButton>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;