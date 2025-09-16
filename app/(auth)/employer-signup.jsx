import CustomInput from '@/components/CustomInput';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import theme from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
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
} from 'react-native';

const { width } = Dimensions.get('window');

export default function EmployerSignup() {
  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    fullAddress: '',
    contactName: '',
    mobileNumber: '',
    gstNumber: '',
    businessNature: '',
  });
  
  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);

  // Update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Full address is required';
    }
    
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.gstNumber.trim()) {
      newErrors.gstNumber = 'GST number is required';
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Please enter a valid GST number';
    }
    
    if (!formData.businessNature.trim()) {
      newErrors.businessNature = 'Nature of business is required';
    }
    
    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the Terms and Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSendingOTP(true);
      
      // Simulate OTP sending
      setTimeout(() => {
        setIsSendingOTP(false);
        setShowOTPModal(true);
      }, 2000);
    }
  };

  // Handle OTP verification
  const handleOTPVerification = () => {
    if (!otp.trim()) {
      setErrors(prev => ({ ...prev, otp: 'Please enter OTP' }));
      return;
    }
    
    if (otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'OTP must be 6 digits' }));
      return;
    }

    setIsVerifying(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      setShowOTPModal(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    setIsSendingOTP(true);
    setOtp('');
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
    
    setTimeout(() => {
      setIsSendingOTP(false);
    }, 1500);
  };

  // Handle success completion
  const handleSuccess = () => {
    setShowSuccessModal(false);
    router.replace('/employer-login');
  };

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background.primary}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background.primary}
      />

      {/* Background Gradient */}
      <LinearGradient
        colors={[
          'rgba(30, 74, 114, 0.08)',
          'rgba(30, 74, 114, 0.02)',
          theme.colors.background.primary,
        ]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        locations={[0, 0.3, 1]}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
              Company Registration
            </Text>
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.regular,
                color: theme.colors.text.secondary,
              }}
            >
              Register your company to hire talent
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
          {/* Company Information Section */}
          <Text
            style={{
              fontSize: theme.typography.sizes.md,
              fontFamily: theme.typography.fonts.semiBold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
            }}
          >
            Company Information
          </Text>

          <CustomInput
            label="Name of Company"
            value={formData.companyName}
            onChangeText={(value) => updateFormData('companyName', value)}
            placeholder="Enter your company name"
            icon="business-outline"
            error={errors.companyName}
            required
          />

          <CustomInput
            label="Full Address"
            value={formData.fullAddress}
            onChangeText={(value) => updateFormData('fullAddress', value)}
            placeholder="Enter complete company address"
            icon="location-outline"
            multiline
            numberOfLines={3}
            error={errors.fullAddress}
            required
          />

          <CustomInput
            label="GST Number"
            value={formData.gstNumber}
            onChangeText={(value) => updateFormData('gstNumber', value.toUpperCase())}
            placeholder="Enter GST number (e.g., 22AAAAA0000A1Z5)"
            icon="document-text-outline"
            maxLength={15}
            error={errors.gstNumber}
            required
          />

          <CustomInput
            label="Nature of Business"
            value={formData.businessNature}
            onChangeText={(value) => updateFormData('businessNature', value)}
            placeholder="e.g., IT Services, Manufacturing, Healthcare"
            icon="layers-outline"
            error={errors.businessNature}
            required
          />

          {/* Contact Information Section */}
          <Text
            style={{
              fontSize: theme.typography.sizes.md,
              fontFamily: theme.typography.fonts.semiBold,
              color: theme.colors.text.primary,
              marginTop: theme.spacing.xl,
              marginBottom: theme.spacing.lg,
            }}
          >
            Contact Information
          </Text>

          <CustomInput
            label="Name of Contact Person"
            value={formData.contactName}
            onChangeText={(value) => updateFormData('contactName', value)}
            placeholder="Enter contact person's full name"
            icon="person-outline"
            error={errors.contactName}
            required
          />

          <CustomInput
            label="Mobile Number"
            value={formData.mobileNumber}
            onChangeText={(value) => updateFormData('mobileNumber', value)}
            placeholder="Enter 10-digit mobile number"
            icon="call-outline"
            keyboardType="phone-pad"
            maxLength={10}
            error={errors.mobileNumber}
            required
          />

          {/* Terms and Conditions */}
          <View style={{ marginTop: theme.spacing.xl, marginBottom: theme.spacing.lg }}>
            <TouchableOpacity
              onPress={() => {
                setAcceptedTerms(!acceptedTerms);
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: '' }));
                }
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingVertical: theme.spacing.sm,
              }}
              activeOpacity={0.8}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: acceptedTerms ? theme.colors.primary.deepBlue : theme.colors.border.medium,
                  backgroundColor: acceptedTerms ? theme.colors.primary.deepBlue : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: theme.spacing.sm,
                  marginTop: 2,
                }}
              >
                {acceptedTerms && (
                  <Ionicons
                    name="checkmark"
                    size={12}
                    color={theme.colors.neutral.white}
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: theme.typography.sizes.sm,
                    fontFamily: theme.typography.fonts.regular,
                    color: theme.colors.text.secondary,
                    lineHeight: theme.typography.sizes.sm * 1.4,
                  }}
                >
                  I accept the{' '}
                  <Text
                    style={{
                      color: theme.colors.primary.deepBlue,
                      fontFamily: theme.typography.fonts.semiBold,
                      textDecorationLine: 'underline',
                    }}
                  >
                    Terms and Conditions
                  </Text>
                  {' '}and{' '}
                  <Text
                    style={{
                      color: theme.colors.primary.deepBlue,
                      fontFamily: theme.typography.fonts.semiBold,
                      textDecorationLine: 'underline',
                    }}
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>

            {errors.terms && (
              <Text
                style={{
                  fontSize: theme.typography.sizes.xs,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.status.error,
                  marginTop: theme.spacing.xs,
                  marginLeft: theme.spacing.lg,
                }}
              >
                {errors.terms}
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSendingOTP}
            style={{
              borderRadius: theme.borderRadius.lg,
              marginTop: theme.spacing.lg,
              marginBottom: theme.spacing.xl,
              overflow: 'hidden',
            }}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[theme.colors.primary.deepBlue, theme.colors.secondary.darkBlue]}
              style={{
                paddingVertical: theme.spacing.lg,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                opacity: isSendingOTP ? 0.7 : 1,
              }}
            >
              {isSendingOTP && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: theme.colors.neutral.white,
                    borderTopColor: 'transparent',
                    marginRight: theme.spacing.sm,
                  }}
                />
              )}
              <Ionicons
                name={isSendingOTP ? "hourglass-outline" : "shield-checkmark-outline"}
                size={20}
                color={theme.colors.neutral.white}
                style={{ marginRight: theme.spacing.sm }}
              />
              <Text
                style={{
                  fontSize: theme.typography.sizes.md,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.neutral.white,
                }}
              >
                {isSendingOTP ? 'Sending OTP...' : 'Verify Mobile & Register'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: theme.spacing.md,
              marginBottom: theme.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.regular,
                color: theme.colors.text.tertiary,
              }}
            >
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/employer-login')}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.primary.deepBlue,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* OTP Verification Modal */}
      <Modal
        visible={showOTPModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOTPModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: theme.spacing.lg,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background.card,
              borderRadius: theme.borderRadius.xl,
              width: '100%',
              maxWidth: 400,
              padding: theme.spacing.xl,
            }}
          >
            {/* Header */}
            <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: 'rgba(30, 74, 114, 0.1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: theme.spacing.md,
                }}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={28}
                  color={theme.colors.primary.deepBlue}
                />
              </View>
              <Text
                style={{
                  fontSize: theme.typography.sizes.xl,
                  fontFamily: theme.typography.fonts.bold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.xs,
                }}
              >
                Verify Mobile Number
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.secondary,
                  textAlign: 'center',
                }}
              >
                Enter the 6-digit OTP sent to{'\n'}{formData.mobileNumber}
              </Text>
            </View>

            {/* OTP Input */}
            <CustomInput
              label="Enter OTP"
              value={otp}
              onChangeText={(value) => {
                setOtp(value);
                if (errors.otp) {
                  setErrors(prev => ({ ...prev, otp: '' }));
                }
              }}
              placeholder="6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              error={errors.otp}
              icon="keypad-outline"
              style={{ marginBottom: theme.spacing.lg }}
            />

            {/* Resend OTP */}
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={isSendingOTP}
              style={{
                alignSelf: 'center',
                paddingVertical: theme.spacing.sm,
                marginBottom: theme.spacing.lg,
              }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.medium,
                  color: isSendingOTP ? theme.colors.text.tertiary : theme.colors.primary.deepBlue,
                }}
              >
                {isSendingOTP ? 'Sending OTP...' : 'Resend OTP'}
              </Text>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
              <TouchableOpacity
                onPress={() => setShowOTPModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.neutral.lightGray,
                  borderRadius: theme.borderRadius.lg,
                  paddingVertical: theme.spacing.md,
                  alignItems: 'center',
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
                onPress={handleOTPVerification}
                disabled={isVerifying}
                style={{
                  flex: 1,
                  borderRadius: theme.borderRadius.lg,
                  overflow: 'hidden',
                }}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={[theme.colors.primary.deepBlue, theme.colors.secondary.darkBlue]}
                  style={{
                    paddingVertical: theme.spacing.md,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  {isVerifying && (
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
                    {isVerifying ? 'Verifying...' : 'Verify'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: theme.spacing.lg,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background.card,
              borderRadius: theme.borderRadius.xl,
              width: '100%',
              maxWidth: 400,
              padding: theme.spacing.xl,
              alignItems: 'center',
            }}
          >
            {/* Success Icon with Logo */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: theme.spacing.lg,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: theme.colors.status.success,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: theme.spacing.md,
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={40}
                  color={theme.colors.neutral.white}
                />
              </View>
              
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
                textAlign: 'center',
              }}
            >
              Registration Successful!
            </Text>

            <Text
              style={{
                fontSize: theme.typography.sizes.base,
                fontFamily: theme.typography.fonts.regular,
                color: theme.colors.text.secondary,
                textAlign: 'center',
                marginBottom: theme.spacing.lg,
                lineHeight: theme.typography.sizes.base * 1.5,
              }}
            >
              Your company registration is pending admin approval. You'll receive a notification once approved.
            </Text>

            <TouchableOpacity
              onPress={handleSuccess}
              style={{
                width: '100%',
                borderRadius: theme.borderRadius.lg,
                overflow: 'hidden',
              }}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[theme.colors.primary.deepBlue, theme.colors.secondary.darkBlue]}
                style={{
                  paddingVertical: theme.spacing.md,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.sizes.base,
                    fontFamily: theme.typography.fonts.semiBold,
                    color: theme.colors.neutral.white,
                  }}
                >
                  Continue to Login
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaWrapper>
  );
}