import theme from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CreateJob() {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: '',
    experience: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    skills: '',
    urgency: 'medium',
    validUntil: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropdown options
  const employmentTypeOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Remote',
    'Hybrid'
  ];

  const experienceOptions = [
    'Entry Level (0-1 years)',
    'Junior (1-3 years)',
    'Mid Level (3-5 years)',
    'Senior (5-8 years)',
    'Lead/Manager (8+ years)'
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low Priority', color: theme.colors.status.success },
    { value: 'medium', label: 'Medium Priority', color: theme.colors.status.warning },
    { value: 'high', label: 'High Priority', color: theme.colors.status.error },
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.employmentType.trim()) newErrors.employmentType = 'Employment type is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience level is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Responsibilities are required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';
    if (!formData.skills.trim()) newErrors.skills = 'Required skills are needed';

    // Salary validation
    if (formData.salaryMin && formData.salaryMax) {
      const minSalary = parseInt(formData.salaryMin);
      const maxSalary = parseInt(formData.salaryMax);
      
      if (minSalary >= maxSalary) {
        newErrors.salaryMax = 'Maximum salary should be higher than minimum';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Mock API call
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          'Job Posted Successfully!',
          'Your job posting is now live and candidates can apply.',
          [
            {
              text: 'View Job',
              onPress: () => router.replace('/employer/jobs')
            }
          ]
        );
      }, 2000);
    }
  };

  const handleSaveDraft = () => {
    Alert.alert(
      'Draft Saved',
      'Your job posting has been saved as a draft.',
      [{ text: 'OK' }]
    );
  };

  // Header Component
  const Header = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.background.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.light,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.background.accent,
        }}
        activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back"
          size={20}
          color={theme.colors.primary.teal}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: theme.typography.sizes.md,
          fontFamily: theme.typography.fonts.semiBold,
          color: theme.colors.text.primary,
          flex: 1,
          textAlign: 'center',
        }}
      >
        Create Job Posting
      </Text>

      <TouchableOpacity
        onPress={handleSaveDraft}
        style={{
          backgroundColor: theme.colors.background.accent,
          borderRadius: theme.borderRadius.md,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        }}
        activeOpacity={0.8}
      >
        <Text
          style={{
            fontSize: theme.typography.sizes.sm,
            fontFamily: theme.typography.fonts.medium,
            color: theme.colors.primary.teal,
          }}
        >
          Save Draft
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Custom Input Component
  const CustomInput = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    error, 
    multiline = false, 
    numberOfLines = 1,
    required = false 
  }) => (
    <View style={{ marginBottom: theme.spacing.md }}>
      <View style={{ flexDirection: 'row', marginBottom: theme.spacing.xs }}>
        <Text
          style={{
            fontSize: theme.typography.sizes.sm,
            fontFamily: theme.typography.fonts.medium,
            color: theme.colors.text.secondary,
            letterSpacing: 0.2,
          }}
        >
          {label}
        </Text>
        {required && (
          <Text
            style={{
              color: theme.colors.status.error,
              fontSize: theme.typography.sizes.sm,
              marginLeft: 2,
            }}
          >
            *
          </Text>
        )}
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={{
          backgroundColor: theme.colors.background.card,
          borderWidth: 1,
          borderColor: error ? theme.colors.status.error : theme.colors.border.light,
          borderRadius: theme.borderRadius.lg,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: multiline ? theme.spacing.md : theme.spacing.sm,
          fontSize: theme.typography.sizes.base,
          fontFamily: theme.typography.fonts.regular,
          color: theme.colors.text.primary,
          textAlignVertical: multiline ? 'top' : 'center',
          minHeight: multiline ? numberOfLines * 20 + theme.spacing.lg : 50,
        }}
      />

      {error && (
        <Text
          style={{
            fontSize: theme.typography.sizes.xs,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.status.error,
            marginTop: theme.spacing.xs,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );

  // Custom Dropdown Component
  const CustomDropdown = ({ label, value, onSelect, options, error, required = false }) => (
    <View style={{ marginBottom: theme.spacing.md }}>
      <View style={{ flexDirection: 'row', marginBottom: theme.spacing.xs }}>
        <Text
          style={{
            fontSize: theme.typography.sizes.sm,
            fontFamily: theme.typography.fonts.medium,
            color: theme.colors.text.secondary,
            letterSpacing: 0.2,
          }}
        >
          {label}
        </Text>
        {required && (
          <Text
            style={{
              color: theme.colors.status.error,
              fontSize: theme.typography.sizes.sm,
              marginLeft: 2,
            }}
          >
            *
          </Text>
        )}
      </View>

      <View style={{ flexWrap: 'wrap', flexDirection: 'row', gap: theme.spacing.sm }}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(typeof option === 'string' ? option : option.value)}
            style={{
              backgroundColor: value === (typeof option === 'string' ? option : option.value)
                ? theme.colors.primary.teal 
                : theme.colors.background.card,
              borderWidth: 1,
              borderColor: value === (typeof option === 'string' ? option : option.value)
                ? theme.colors.primary.teal 
                : theme.colors.border.light,
              borderRadius: theme.borderRadius.md,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.medium,
                color: value === (typeof option === 'string' ? option : option.value)
                  ? theme.colors.neutral.white 
                  : theme.colors.text.primary,
              }}
            >
              {typeof option === 'string' ? option : option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error && (
        <Text
          style={{
            fontSize: theme.typography.sizes.xs,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.status.error,
            marginTop: theme.spacing.xs,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background.card}
      />

      {/* Background Gradient */}
      <LinearGradient
        colors={[
          theme.colors.background.accent,
          'rgba(27, 163, 163, 0.02)',
          theme.colors.background.primary,
        ]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        locations={[0, 0.2, 1]}
      />

      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.lg,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Basic Information Section */}
          <View
            style={{
              backgroundColor: theme.colors.background.card,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.lg,
              marginBottom: theme.spacing.lg,
              borderWidth: 1,
              borderColor: theme.colors.border.light,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.md,
                fontFamily: theme.typography.fonts.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
              }}
            >
              Basic Information
            </Text>

            <CustomInput
              label="Job Title"
              value={formData.title}
              onChangeText={(value) => updateFormData('title', value)}
              placeholder="e.g., Senior React Developer"
              error={errors.title}
              required
            />

            <CustomInput
              label="Department"
              value={formData.department}
              onChangeText={(value) => updateFormData('department', value)}
              placeholder="e.g., Engineering, Marketing, Sales"
              error={errors.department}
            />

            <CustomInput
              label="Location"
              value={formData.location}
              onChangeText={(value) => updateFormData('location', value)}
              placeholder="e.g., Mumbai, Remote, Hybrid"
              error={errors.location}
              required
            />

            <CustomDropdown
              label="Employment Type"
              value={formData.employmentType}
              onSelect={(value) => updateFormData('employmentType', value)}
              options={employmentTypeOptions}
              error={errors.employmentType}
              required
            />

            <CustomDropdown
              label="Experience Level"
              value={formData.experience}
              onSelect={(value) => updateFormData('experience', value)}
              options={experienceOptions}
              error={errors.experience}
              required
            />
          </View>

          {/* Compensation Section */}
          <View
            style={{
              backgroundColor: theme.colors.background.card,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.lg,
              marginBottom: theme.spacing.lg,
              borderWidth: 1,
              borderColor: theme.colors.border.light,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.md,
                fontFamily: theme.typography.fonts.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
              }}
            >
              Compensation
            </Text>

            <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
              <View style={{ flex: 1 }}>
                <CustomInput
                  label="Minimum Salary (₹ Lakhs)"
                  value={formData.salaryMin}
                  onChangeText={(value) => updateFormData('salaryMin', value)}
                  placeholder="e.g., 8"
                  keyboardType="numeric"
                  error={errors.salaryMin}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput
                  label="Maximum Salary (₹ Lakhs)"
                  value={formData.salaryMax}
                  onChangeText={(value) => updateFormData('salaryMax', value)}
                  placeholder="e.g., 15"
                  keyboardType="numeric"
                  error={errors.salaryMax}
                />
              </View>
            </View>
          </View>

          {/* Job Details Section */}
          <View
            style={{
              backgroundColor: theme.colors.background.card,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.lg,
              marginBottom: theme.spacing.lg,
              borderWidth: 1,
              borderColor: theme.colors.border.light,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.md,
                fontFamily: theme.typography.fonts.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
              }}
            >
              Job Details
            </Text>

            <CustomInput
              label="Job Description"
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              placeholder="Describe the role, company culture, and what makes this position exciting..."
              error={errors.description}
              multiline
              numberOfLines={5}
              required
            />

            <CustomInput
              label="Key Responsibilities"
              value={formData.responsibilities}
              onChangeText={(value) => updateFormData('responsibilities', value)}
              placeholder="• Lead development of React applications&#10;• Mentor junior developers&#10;• Collaborate with design team..."
              error={errors.responsibilities}
              multiline
              numberOfLines={5}
              required
            />

            <CustomInput
              label="Requirements"
              value={formData.requirements}
              onChangeText={(value) => updateFormData('requirements', value)}
              placeholder="• 3+ years React experience&#10;• Strong JavaScript knowledge&#10;• Experience with REST APIs..."
              error={errors.requirements}
              multiline
              numberOfLines={5}
              required
            />

            <CustomInput
              label="Benefits & Perks"
              value={formData.benefits}
              onChangeText={(value) => updateFormData('benefits', value)}
              placeholder="• Health insurance&#10;• Flexible working hours&#10;• Professional development budget..."
              error={errors.benefits}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Skills & Priority Section */}
          <View
            style={{
              backgroundColor: theme.colors.background.card,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.lg,
              marginBottom: theme.spacing.lg,
              borderWidth: 1,
              borderColor: theme.colors.border.light,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.md,
                fontFamily: theme.typography.fonts.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
              }}
            >
              Skills & Priority
            </Text>

            <CustomInput
              label="Required Skills"
              value={formData.skills}
              onChangeText={(value) => updateFormData('skills', value)}
              placeholder="React, Node.js, TypeScript, MongoDB, AWS (comma separated)"
              error={errors.skills}
              required
            />

            <CustomDropdown
              label="Priority Level"
              value={formData.urgency}
              onSelect={(value) => updateFormData('urgency', value)}
              options={urgencyOptions}
              error={errors.urgency}
              required
            />

            <CustomInput
              label="Application Deadline"
              value={formData.validUntil}
              onChangeText={(value) => updateFormData('validUntil', value)}
              placeholder="e.g., 2024-02-15"
              error={errors.validUntil}
            />
          </View>
        </ScrollView>

        {/* Fixed Bottom Buttons */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.colors.background.card,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border.light,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
          }}
        >
          <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            <TouchableOpacity
              onPress={handleSaveDraft}
              style={{
                flex: 1,
                backgroundColor: theme.colors.background.accent,
                borderRadius: theme.borderRadius.lg,
                paddingVertical: theme.spacing.md,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: theme.colors.primary.teal,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.base,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.primary.teal,
                }}
              >
                Save Draft
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={{
                flex: 2,
                borderRadius: theme.borderRadius.lg,
                overflow: 'hidden',
              }}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={
                  isSubmitting 
                    ? [theme.colors.neutral.mediumGray, theme.colors.neutral.mediumGray]
                    : [theme.colors.primary.teal, theme.colors.secondary.darkTeal]
                }
                style={{
                  paddingVertical: theme.spacing.md,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                {isSubmitting && (
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: theme.colors.neutral.white,
                      borderTopColor: 'transparent',
                      marginRight: theme.spacing.sm,
                    }}
                  />
                )}
                <Text
                  style={{
                    fontSize: theme.typography.sizes.base,
                    fontFamily: theme.typography.fonts.semiBold,
                    color: theme.colors.neutral.white,
                  }}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Job'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}