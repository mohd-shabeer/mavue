import CustomDropdown from "@/components/CustomDropdown";
import CustomInput from "@/components/CustomInput";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import theme from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Signup() {
  // Form State
  const [userType, setUserType] = useState(""); // 'fresher' or 'experienced'
  const [formData, setFormData] = useState({
    fullName: "",
    fullAddress: "",
    mobileNumber: "",
    email: "",
    aadharNumber: "",
    education: "",
    institution: "",
    areaOfInterest: "",
    currentPosition: "",
    function: "",
    yearsOfExperience: "",
    location: "",
    industryNature: "",
    workType: "",
  });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Dropdown Options
  const workTypeOptions = [
    { label: "Full-Time", value: "full-time" },
    { label: "Part-Time", value: "part-time" },
  ];

  // Validation
  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.fullAddress.trim())
      newErrors.fullAddress = "Address is required";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Invalid mobile number";

    // Type-specific validations
    if (userType === "fresher") {
      if (!formData.aadharNumber.trim())
        newErrors.aadharNumber = "Aadhar number is required";
      if (!formData.education.trim())
        newErrors.education = "Education is required";
      if (!formData.institution.trim())
        newErrors.institution = "Institution is required";
      if (!formData.areaOfInterest.trim())
        newErrors.areaOfInterest = "Area of interest is required";
      if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber))
        newErrors.aadharNumber = "Invalid Aadhar number";
    }

    if (userType === "experienced") {
      if (!formData.currentPosition.trim())
        newErrors.currentPosition = "Current position is required";
      if (!formData.function.trim())
        newErrors.function = "Function is required";
      if (!formData.yearsOfExperience.trim())
        newErrors.yearsOfExperience = "Experience is required";
      if (!formData.education.trim())
        newErrors.education = "Education is required";
      if (!formData.location.trim())
        newErrors.location = "Location is required";
      if (!formData.industryNature.trim())
        newErrors.industryNature = "Industry nature is required";
      if (!formData.workType) newErrors.workType = "Work type is required";
    }

    if (skills.length === 0)
      newErrors.skills = "At least one skill is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addSkill = () => {
    if (
      newSkill.trim() &&
      skills.length < 9 &&
      !skills.includes(newSkill.trim())
    ) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
      if (errors.skills) {
        setErrors((prev) => ({ ...prev, skills: "" }));
      }
    }
  };

  const handleSkillInputSubmit = () => {
    addSkill();
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);

    // Mock payment process
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    router.replace("/signin"); // Navigate to signin or dashboard
  };

  // User Type Selection Card
  const UserTypeCard = ({
    type,
    title,
    description,
    icon,
    isSelected,
    onPress,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: theme.colors.background.card,
        borderWidth: 2,
        borderColor: isSelected
          ? theme.colors.primary.teal
          : theme.colors.border.light,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: isSelected
            ? theme.colors.primary.teal
            : theme.colors.neutral.lightGray,
          justifyContent: "center",
          alignItems: "center",
          marginRight: theme.spacing.md,
        }}
      >
        <Ionicons
          name={icon}
          size={24}
          color={
            isSelected ? theme.colors.neutral.white : theme.colors.text.tertiary
          }
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: theme.typography.sizes.md,
            fontFamily: theme.typography.fonts.semiBold,
            color: isSelected
              ? theme.colors.primary.teal
              : theme.colors.text.primary,
            marginBottom: theme.spacing.xs,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: theme.typography.sizes.sm,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.text.secondary,
          }}
        >
          {description}
        </Text>
      </View>
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={theme.colors.primary.teal}
        />
      )}
    </TouchableOpacity>
  );

  // Skills Section - Fixed version
  const SkillsSection = () => (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <Text
        style={{
          fontSize: theme.typography.sizes.sm,
          fontFamily: theme.typography.fonts.medium,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.xs,
        }}
      >
        Skills (Add up to 9 skills) *
      </Text>

      {/* Add Skill Input */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: theme.spacing.md,
        }}
      >
        <CustomInput
          value={newSkill}
          onChangeText={setNewSkill}
          placeholder="Type a skill..."
          style={{ flex: 1, marginBottom: 0, marginRight: theme.spacing.sm }}
          maxLength={20}
          returnKeyType="done"
          blurOnSubmit={false}
          onSubmitEditing={(e) => {
            e.preventDefault(); // Prevent default behavior
            if (
              newSkill.trim() &&
              skills.length < 9 &&
              !skills.includes(newSkill.trim())
            ) {
              addSkill();
              // Keep focus by not blurring
            }
          }}
        />
        <TouchableOpacity
          onPress={addSkill}
          disabled={!newSkill.trim() || skills.length >= 9}
          style={{
            backgroundColor:
              newSkill.trim() && skills.length < 9
                ? theme.colors.primary.teal
                : theme.colors.neutral.mediumGray,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.sm,
            justifyContent: "center",
            alignItems: "center",
            minWidth: 50,
            height: 50,
          }}
        >
          <Ionicons name="add" size={20} color={theme.colors.neutral.white} />
        </TouchableOpacity>
      </View>

      {/* Skills Tags */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: theme.spacing.sm,
        }}
      >
        {skills.map((skill, index) => (
          <View
            key={index}
            style={{
              backgroundColor: theme.colors.background.accent,
              borderRadius: theme.borderRadius.full,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.xs,
              marginRight: theme.spacing.sm,
              marginBottom: theme.spacing.sm,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: theme.colors.primary.teal,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.medium,
                color: theme.colors.primary.teal,
                marginRight: theme.spacing.xs,
              }}
            >
              {skill}
            </Text>
            <TouchableOpacity
              onPress={() => removeSkill(skill)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close"
                size={14}
                color={theme.colors.primary.teal}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Skills count */}
      <Text
        style={{
          fontSize: theme.typography.sizes.xs,
          fontFamily: theme.typography.fonts.regular,
          color: theme.colors.text.tertiary,
          textAlign: "right",
        }}
      >
        {skills.length}/9 skills added
      </Text>

      {errors.skills && (
        <Text
          style={{
            fontSize: theme.typography.sizes.xs,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.status.error,
            marginTop: theme.spacing.xs,
          }}
        >
          {errors.skills}
        </Text>
      )}
    </View>
  );

  // Payment Modal
  const PaymentModal = () => (
    <Modal
      visible={showPaymentModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowPaymentModal(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: theme.spacing.lg,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.background.card,
            borderRadius: theme.borderRadius.xl,
            width: "100%",
            maxWidth: 400,
            padding: theme.spacing.xl,
          }}
        >
          {/* Header */}
          <View
            style={{ alignItems: "center", marginBottom: theme.spacing.xl }}
          >
            {/* Logo */}
            <Image
              source={require("@/assets/images/company/logo.png")}
              style={{
                width: 40,
                height: 40,
                marginBottom: theme.spacing.md,
              }}
              resizeMode="contain"
            />

            <Text
              style={{
                fontSize: theme.typography.sizes.xl,
                fontFamily: theme.typography.fonts.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
              }}
            >
              Complete Payment
            </Text>
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.regular,
                color: theme.colors.text.secondary,
                textAlign: "center",
              }}
            >
              Subscribe to access premium features
            </Text>
          </View>

          {/* Plan Details */}
          <View
            style={{
              backgroundColor: theme.colors.background.accent,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.lg,
              marginBottom: theme.spacing.xl,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.md,
                fontFamily: theme.typography.fonts.semiBold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.sm,
              }}
            >
              6-Month Premium Access
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.secondary,
                }}
              >
                Total Amount
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.sizes.xxl,
                  fontFamily: theme.typography.fonts.bold,
                  color: theme.colors.primary.teal,
                }}
              >
                ₹499
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
            <TouchableOpacity
              onPress={() => setShowPaymentModal(false)}
              style={{
                flex: 1,
                backgroundColor: theme.colors.neutral.lightGray,
                borderRadius: theme.borderRadius.lg,
                paddingVertical: theme.spacing.md,
                alignItems: "center",
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.base,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.text.secondary,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePayment}
              disabled={isProcessingPayment}
              style={{
                flex: 1,
                borderRadius: theme.borderRadius.lg,
                overflow: "hidden",
              }}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[
                  theme.colors.primary.teal,
                  theme.colors.secondary.darkTeal,
                ]}
                style={{
                  paddingVertical: theme.spacing.md,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {isProcessingPayment && (
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: theme.colors.neutral.white,
                      borderTopColor: "transparent",
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
                  {isProcessingPayment ? "Processing..." : "Pay Now"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Success Modal
  const SuccessModal = () => (
    <Modal visible={showSuccessModal} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: theme.spacing.lg,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.background.card,
            borderRadius: theme.borderRadius.xl,
            width: "100%",
            maxWidth: 400,
            padding: theme.spacing.xl,
            alignItems: "center",
          }}
        >
          {/* Success Icon with Logo */}
          <View
            style={{
              alignItems: "center",
              marginBottom: theme.spacing.lg,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: theme.colors.status.success,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: theme.spacing.md,
              }}
            >
              <Ionicons
                name="checkmark"
                size={40}
                color={theme.colors.neutral.white}
              />
            </View>

            {/* Logo */}
            <Image
              source={require("@/assets/images/company/logo.png")}
              style={{
                width: 36,
                height: 36,
              }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              fontSize: theme.typography.sizes.xl,
              fontFamily: theme.typography.fonts.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm,
              textAlign: "center",
            }}
          >
            Welcome to Manvue!
          </Text>

          <Text
            style={{
              fontSize: theme.typography.sizes.base,
              fontFamily: theme.typography.fonts.regular,
              color: theme.colors.text.secondary,
              textAlign: "center",
              marginBottom: theme.spacing.xl,
              lineHeight: theme.typography.sizes.base * 1.5,
            }}
          >
            Your account has been created successfully. You can now start
            exploring amazing career opportunities.
          </Text>

          <TouchableOpacity
            onPress={handleSuccess}
            style={{
              width: "100%",
              borderRadius: theme.borderRadius.lg,
              overflow: "hidden",
            }}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[
                theme.colors.primary.teal,
                theme.colors.secondary.darkTeal,
              ]}
              style={{
                paddingVertical: theme.spacing.md,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.base,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.neutral.white,
                }}
              >
                Get Started
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background.primary}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background.primary}
      />

      {/* Background Gradient */}
      <LinearGradient
        colors={[
          theme.colors.background.accent,
          "rgba(27, 163, 163, 0.02)",
          theme.colors.background.primary,
        ]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        locations={[0, 0.3, 1]}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border.light,
            backgroundColor: theme.colors.background.card,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              padding: theme.spacing.sm,
              marginRight: theme.spacing.md,
            }}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>

          {/* Logo */}
          <Image
            source={require("@/assets/images/company/logo.png")}
            style={{
              width: 32,
              height: 32,
              marginRight: theme.spacing.md,
            }}
            resizeMode="contain"
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: theme.typography.sizes.lg,
                fontFamily: theme.typography.fonts.bold,
                color: theme.colors.text.primary,
              }}
            >
              Create Account
            </Text>
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.regular,
                color: theme.colors.text.secondary,
              }}
            >
              {!userType
                ? "Choose your profile type"
                : userType === "fresher"
                ? "Student/Fresher Registration"
                : "Professional Registration"}
            </Text>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Step 1: User Type Selection */}
          {!userType && (
            <View>
              <Text
                style={{
                  fontSize: theme.typography.sizes.md,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.lg,
                }}
              >
                Select Your Profile Type
              </Text>

              <UserTypeCard
                type="fresher"
                title="Fresher / Student"
                description="New graduates or job market entrants"
                icon="school-outline"
                isSelected={userType === "fresher"}
                onPress={() => setUserType("fresher")}
              />

              <UserTypeCard
                type="experienced"
                title="Experienced Professional"
                description="Users with work experience"
                icon="briefcase-outline"
                isSelected={userType === "experienced"}
                onPress={() => setUserType("experienced")}
              />
            </View>
          )}

          {/* Step 2: Form Fields */}
          {userType && (
            <View>
              {/* Common Fields */}
              <Text
                style={{
                  fontSize: theme.typography.sizes.md,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.lg,
                }}
              >
                Personal Information
              </Text>

              <CustomInput
                label="Full Name"
                value={formData.fullName}
                onChangeText={(value) => updateFormData("fullName", value)}
                placeholder="Enter your full name"
                icon="person-outline"
                error={errors.fullName}
                required
              />

              <CustomInput
                label="Full Address"
                value={formData.fullAddress}
                onChangeText={(value) => updateFormData("fullAddress", value)}
                placeholder="Enter your complete address"
                icon="location-outline"
                multiline
                numberOfLines={3}
                error={errors.fullAddress}
                required
              />

              <CustomInput
                label="Mobile Number"
                value={formData.mobileNumber}
                onChangeText={(value) => updateFormData("mobileNumber", value)}
                placeholder="Enter 10-digit mobile number"
                icon="call-outline"
                keyboardType="phone-pad"
                maxLength={10}
                error={errors.mobileNumber}
                required
              />

              <CustomInput
                label="Email Address"
                value={formData.email}
                onChangeText={(value) => updateFormData("email", value)}
                placeholder="Enter your email address"
                icon="mail-outline"
                keyboardType="email-address"
                error={errors.email}
                required
              />

              {/* Fresher-specific Fields */}
              {userType === "fresher" && (
                <>
                  <Text
                    style={{
                      fontSize: theme.typography.sizes.md,
                      fontFamily: theme.typography.fonts.semiBold,
                      color: theme.colors.text.primary,
                      marginTop: theme.spacing.xl,
                      marginBottom: theme.spacing.lg,
                    }}
                  >
                    Educational Information
                  </Text>

                  <CustomInput
                    label="Aadhar Number"
                    value={formData.aadharNumber}
                    onChangeText={(value) =>
                      updateFormData("aadharNumber", value)
                    }
                    placeholder="Enter 12-digit Aadhar number"
                    icon="card-outline"
                    keyboardType="number-pad"
                    maxLength={12}
                    error={errors.aadharNumber}
                    required
                  />

                  <CustomInput
                    label="Education"
                    value={formData.education}
                    onChangeText={(value) => updateFormData("education", value)}
                    placeholder="e.g., B.Tech, MBA, B.Com"
                    icon="school-outline"
                    error={errors.education}
                    required
                  />

                  <CustomInput
                    label="Institution"
                    value={formData.institution}
                    onChangeText={(value) =>
                      updateFormData("institution", value)
                    }
                    placeholder="College/University name"
                    icon="library-outline"
                    error={errors.institution}
                    required
                  />

                  <CustomInput
                    label="Area of Interest"
                    value={formData.areaOfInterest}
                    onChangeText={(value) =>
                      updateFormData("areaOfInterest", value)
                    }
                    placeholder="e.g., Software Development, Marketing"
                    icon="bulb-outline"
                    error={errors.areaOfInterest}
                    required
                  />
                </>
              )}

              {/* Experienced-specific Fields */}
              {userType === "experienced" && (
                <>
                  <Text
                    style={{
                      fontSize: theme.typography.sizes.md,
                      fontFamily: theme.typography.fonts.semiBold,
                      color: theme.colors.text.primary,
                      marginTop: theme.spacing.xl,
                      marginBottom: theme.spacing.lg,
                    }}
                  >
                    Professional Information
                  </Text>

                  <CustomInput
                    label="Current/Last Position"
                    value={formData.currentPosition}
                    onChangeText={(value) =>
                      updateFormData("currentPosition", value)
                    }
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    icon="briefcase-outline"
                    error={errors.currentPosition}
                    required
                  />

                  <CustomInput
                    label="Function"
                    value={formData.function}
                    onChangeText={(value) => updateFormData("function", value)}
                    placeholder="e.g., Engineering, Sales, HR"
                    icon="layers-outline"
                    error={errors.function}
                    required
                  />

                  <CustomInput
                    label="Years of Experience"
                    value={formData.yearsOfExperience}
                    onChangeText={(value) =>
                      updateFormData("yearsOfExperience", value)
                    }
                    placeholder="e.g., 3, 5, 10"
                    icon="time-outline"
                    keyboardType="number-pad"
                    error={errors.yearsOfExperience}
                    required
                  />

                  <CustomInput
                    label="Education"
                    value={formData.education}
                    onChangeText={(value) => updateFormData("education", value)}
                    placeholder="e.g., B.Tech, MBA, B.Com"
                    icon="school-outline"
                    error={errors.education}
                    required
                  />

                  <CustomInput
                    label="Preferred Work Location"
                    value={formData.location}
                    onChangeText={(value) => updateFormData("location", value)}
                    placeholder="e.g., Mumbai, Remote, Bangalore"
                    icon="location-outline"
                    error={errors.location}
                    required
                  />

                  <CustomInput
                    label="Nature of Industry"
                    value={formData.industryNature}
                    onChangeText={(value) =>
                      updateFormData("industryNature", value)
                    }
                    placeholder="e.g., IT, Healthcare, Finance"
                    icon="business-outline"
                    error={errors.industryNature}
                    required
                  />

                  <CustomDropdown
                    label="Work Type"
                    value={formData.workType}
                    onSelect={(value) => updateFormData("workType", value)}
                    options={workTypeOptions}
                    placeholder="Select work type"
                    icon="options-outline"
                    error={errors.workType}
                    required
                  />
                </>
              )}

              {/* Skills Section */}
              <Text
                style={{
                  fontSize: theme.typography.sizes.md,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.text.primary,
                  marginTop: theme.spacing.xl,
                  marginBottom: theme.spacing.lg,
                }}
              >
                Skills & Expertise
              </Text>

              <SkillsSection />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  borderRadius: theme.borderRadius.lg,
                  marginTop: theme.spacing.lg,
                  marginBottom: theme.spacing.xl,
                  overflow: "hidden",
                }}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={[
                    theme.colors.primary.teal,
                    theme.colors.secondary.darkTeal,
                  ]}
                  style={{
                    paddingVertical: theme.spacing.lg,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.sizes.md,
                      fontFamily: theme.typography.fonts.semiBold,
                      color: theme.colors.neutral.white,
                      marginRight: theme.spacing.sm,
                    }}
                  >
                    Continue to Payment
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={theme.colors.neutral.white}
                  />
                </LinearGradient>
              </TouchableOpacity>

              {/* Reset Type Button */}
              <TouchableOpacity
                onPress={() => {
                  setUserType("");
                  setFormData({
                    fullName: "",
                    fullAddress: "",
                    mobileNumber: "",
                    email: "",
                    aadharNumber: "",
                    education: "",
                    institution: "",
                    areaOfInterest: "",
                    currentPosition: "",
                    function: "",
                    yearsOfExperience: "",
                    location: "",
                    industryNature: "",
                    workType: "",
                  });
                  setSkills([]);
                  setErrors({});
                }}
                style={{
                  alignItems: "center",
                  paddingVertical: theme.spacing.md,
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontSize: theme.typography.sizes.sm,
                    fontFamily: theme.typography.fonts.medium,
                    color: theme.colors.text.tertiary,
                  }}
                >
                  Change Profile Type
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modals */}
      <PaymentModal />
      <SuccessModal />
    </SafeAreaWrapper>
  );
}
