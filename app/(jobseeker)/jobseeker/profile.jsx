import theme from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Profile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // User profile data with pending changes
  const [userProfile, setUserProfile] = useState({
    // Basic Info
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    mobileNumber: '+91 9876543210',
    fullAddress: '123 Tech Street, Andheri West, Mumbai, Maharashtra 400058',
    
    // Professional Info
    currentPosition: 'Senior React Developer',
    function: 'Frontend Development',
    yearsOfExperience: '5',
    education: 'B.Tech Computer Science',
    institution: 'Indian Institute of Technology, Mumbai',
    location: 'Mumbai, Remote',
    industryNature: 'Information Technology',
    workType: 'Full-time',
    areaOfInterest: 'Web Development, Mobile Apps',
    
    // Skills
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'React Native'],
    
    // Profile Stats
    profileCompletion: 85,
    joinDate: '2024-01-15',
    lastActive: '2025-01-16',
    subscriptionStatus: 'Active',
    subscriptionExpiry: '2025-07-15',
    
    // Account Status
    accountStatus: 'Active',
    isVerified: true,
  });

  // Pending changes that require admin approval
  const [pendingChanges, setPendingChanges] = useState({
    fullName: null,
    education: {
      value: 'M.Tech Computer Science',
      submittedAt: '2025-01-15',
      status: 'pending' // 'pending', 'approved', 'rejected'
    },
    currentPosition: null,
    yearsOfExperience: {
      value: '6',
      submittedAt: '2025-01-14',
      status: 'pending'
    },
  });

  // Fields that require admin approval for changes
  const criticalFields = [
    'fullName',
    'education',
    'institution',
    'currentPosition',
    'yearsOfExperience',
    'areaOfInterest'
  ];

  const handleEditField = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
    setShowEditModal(true);
  };

  const handleSaveField = () => {
    if (!tempValue.trim()) return;

    const isCriticalField = criticalFields.includes(editingField);
    
    if (isCriticalField) {
      // Submit for admin approval
      const newPendingChange = {
        value: tempValue.trim(),
        submittedAt: new Date().toISOString().slice(0, 10),
        status: 'pending'
      };
      
      setPendingChanges(prev => ({
        ...prev,
        [editingField]: newPendingChange
      }));

      Alert.alert(
        'Change Submitted',
        'Your change has been submitted for admin approval. You will be notified once it\'s reviewed.',
        [{ text: 'OK' }]
      );
    } else {
      // Update immediately for non-critical fields
      setUserProfile(prev => ({
        ...prev,
        [editingField]: tempValue.trim()
      }));

      Alert.alert(
        'Profile Updated',
        'Your profile has been updated successfully.',
        [{ text: 'OK' }]
      );
    }

    setShowEditModal(false);
    setEditingField(null);
    setTempValue('');
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Implement logout logic
    Alert.alert(
      'Logged Out',
      'You have been logged out successfully.',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/choose-path')
        }
      ]
    );
  };

  const getDisplayValue = (field) => {
    const pendingChange = pendingChanges[field];
    if (pendingChange && pendingChange.status === 'pending') {
      return `${userProfile[field]} (pending approval)`;
    }
    return userProfile[field];
  };

  const isPending = (field) => {
    const pendingChange = pendingChanges[field];
    return pendingChange && pendingChange.status === 'pending';
  };

  // Header Component
  const Header = () => (
    <View
      style={{
        backgroundColor: theme.colors.background.card,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.light,
      }}
    >
      {/* Profile Avatar and Basic Info */}
      <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: theme.colors.primary.teal,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing.md,
            borderWidth: 3,
            borderColor: theme.colors.background.accent,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.sizes.xxxl,
              fontFamily: theme.typography.fonts.bold,
              color: theme.colors.neutral.white,
            }}
          >
            {userProfile.fullName.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>

        <Text
          style={{
            fontSize: theme.typography.sizes.lg,
            fontFamily: theme.typography.fonts.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.xs,
          }}
        >
          {userProfile.fullName}
        </Text>

        <Text
          style={{
            fontSize: theme.typography.sizes.base,
            fontFamily: theme.typography.fonts.medium,
            color: theme.colors.primary.teal,
            marginBottom: theme.spacing.xs,
          }}
        >
          {userProfile.currentPosition}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={theme.colors.status.success}
            style={{ marginRight: theme.spacing.xs }}
          />
          <Text
            style={{
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fonts.regular,
              color: theme.colors.status.success,
            }}
          >
            Verified Profile
          </Text>
        </View>
      </View>

      {/* Profile Stats */}
      <View
        style={{
          flexDirection: 'row',
          gap: theme.spacing.sm,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background.accent,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.md,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.sizes.xl,
              fontFamily: theme.typography.fonts.bold,
              color: theme.colors.primary.teal,
            }}
          >
            {userProfile.profileCompletion}%
          </Text>
          <Text
            style={{
              fontSize: theme.typography.sizes.xs,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Complete
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background.accent,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.md,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.sizes.xl,
              fontFamily: theme.typography.fonts.bold,
              color: theme.colors.primary.orange,
            }}
          >
            {userProfile.skills.length}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.sizes.xs,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Skills
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background.accent,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.md,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.sizes.xl,
              fontFamily: theme.typography.fonts.bold,
              color: theme.colors.status.success,
            }}
          >
            {userProfile.yearsOfExperience}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.sizes.xs,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Years Exp
          </Text>
        </View>
      </View>
    </View>
  );

  // Section Component
  const Section = ({ title, children, icon }) => (
    <View
      style={{
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        margin: theme.spacing.lg,
        marginTop: 0,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: theme.spacing.md,
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={theme.colors.primary.teal}
            style={{ marginRight: theme.spacing.sm }}
          />
        )}
        <Text
          style={{
            fontSize: theme.typography.sizes.md,
            fontFamily: theme.typography.fonts.bold,
            color: theme.colors.text.primary,
          }}
        >
          {title}
        </Text>
      </View>
      {children}
    </View>
  );

  // Field Item Component
  const FieldItem = ({ label, value, field, editable = true, multiline = false }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.light,
        minHeight: 50,
      }}
    >
      <View style={{ flex: 1, marginRight: theme.spacing.md }}>
        <Text
          style={{
            fontSize: theme.typography.sizes.sm,
            fontFamily: theme.typography.fonts.medium,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.xs,
          }}
        >
          {label}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text
            style={{
              fontSize: theme.typography.sizes.base,
              fontFamily: theme.typography.fonts.regular,
              color: isPending(field) ? theme.colors.primary.orange : theme.colors.text.primary,
              flex: 1,
              lineHeight: theme.typography.sizes.base * 1.3,
            }}
          >
            {getDisplayValue(field)}
          </Text>
          {isPending(field) && (
            <View
              style={{
                backgroundColor: theme.colors.primary.orange,
                borderRadius: theme.borderRadius.sm,
                paddingHorizontal: theme.spacing.xs,
                paddingVertical: 2,
                marginLeft: theme.spacing.xs,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.xs,
                  fontFamily: theme.typography.fonts.bold,
                  color: theme.colors.neutral.white,
                }}
              >
                PENDING
              </Text>
            </View>
          )}
        </View>
      </View>
      
      {editable && (
        <TouchableOpacity
          onPress={() => handleEditField(field, userProfile[field])}
          style={{
            padding: theme.spacing.sm,
            borderRadius: theme.borderRadius.sm,
            backgroundColor: theme.colors.background.accent,
          }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="create-outline"
            size={16}
            color={theme.colors.primary.teal}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  // Skills Component
  const SkillsSection = () => (
    <View style={{ marginTop: theme.spacing.sm }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {userProfile.skills.map((skill, index) => (
          <View
            key={index}
            style={{
              backgroundColor: theme.colors.background.accent,
              borderRadius: theme.borderRadius.sm,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              marginRight: theme.spacing.xs,
              marginBottom: theme.spacing.xs,
              borderWidth: 1,
              borderColor: theme.colors.primary.teal,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.medium,
                color: theme.colors.primary.teal,
              }}
            >
              {skill}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => handleEditField('skills', userProfile.skills.join(', '))}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.spacing.md,
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          backgroundColor: theme.colors.background.accent,
        }}
        activeOpacity={0.8}
      >
        <Ionicons
          name="add-circle-outline"
          size={18}
          color={theme.colors.primary.teal}
          style={{ marginRight: theme.spacing.sm }}
        />
        <Text
          style={{
            fontSize: theme.typography.sizes.sm,
            fontFamily: theme.typography.fonts.medium,
            color: theme.colors.primary.teal,
          }}
        >
          Edit Skills
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Pending Changes Section
  const PendingChangesSection = () => {
    const pendingItems = Object.entries(pendingChanges).filter(([_, change]) => 
      change && change.status === 'pending'
    );

    if (pendingItems.length === 0) return null;

    return (
      <Section title="Pending Changes" icon="time-outline">
        <View
          style={{
            backgroundColor: theme.colors.background.accent,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.md,
            borderLeftWidth: 4,
            borderLeftColor: theme.colors.primary.orange,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={theme.colors.primary.orange}
              style={{ marginRight: theme.spacing.sm }}
            />
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.semiBold,
                color: theme.colors.primary.orange,
              }}
            >
              Changes Under Review
            </Text>
          </View>
          
          {pendingItems.map(([field, change]) => (
            <View key={field} style={{ marginBottom: theme.spacing.sm }}>
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.xs,
                }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.secondary,
                }}
              >
                New Value: {change.value}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.sizes.xs,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.tertiary,
                }}
              >
                Submitted: {change.submittedAt}
              </Text>
            </View>
          ))}
          
          <Text
            style={{
              fontSize: theme.typography.sizes.xs,
              fontFamily: theme.typography.fonts.regular,
              color: theme.colors.text.secondary,
              fontStyle: 'italic',
              marginTop: theme.spacing.xs,
            }}
          >
            Important profile changes require admin approval for security purposes.
          </Text>
        </View>
      </Section>
    );
  };

  // Edit Modal
  const EditModal = () => (
    <Modal
      visible={showEditModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowEditModal(false)}
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
          <Text
            style={{
              fontSize: theme.typography.sizes.lg,
              fontFamily: theme.typography.fonts.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm,
              textAlign: 'center',
            }}
          >
            Edit {editingField?.charAt(0).toUpperCase() + editingField?.slice(1).replace(/([A-Z])/g, ' $1')}
          </Text>

          {criticalFields.includes(editingField) && (
            <View
              style={{
                backgroundColor: theme.colors.background.accent,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                marginBottom: theme.spacing.md,
                borderLeftWidth: 3,
                borderLeftColor: theme.colors.primary.orange,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.primary.orange,
                  marginBottom: theme.spacing.xs,
                }}
              >
                Admin Approval Required
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.sizes.xs,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.secondary,
                }}
              >
                This change will be submitted for admin review before being applied to your profile.
              </Text>
            </View>
          )}

          <TextInput
            value={tempValue}
            onChangeText={setTempValue}
            placeholder={`Enter ${editingField}`}
            placeholderTextColor={theme.colors.text.placeholder}
            multiline={editingField === 'fullAddress' || editingField === 'skills'}
            numberOfLines={editingField === 'fullAddress' || editingField === 'skills' ? 3 : 1}
            style={{
              backgroundColor: theme.colors.neutral.lightGray,
              borderRadius: theme.borderRadius.lg,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.md,
              fontSize: theme.typography.sizes.base,
              fontFamily: theme.typography.fonts.regular,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              textAlignVertical: 'top',
            }}
          />

          <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            <TouchableOpacity
              onPress={() => setShowEditModal(false)}
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
              onPress={handleSaveField}
              disabled={!tempValue.trim()}
              style={{
                flex: 1,
                borderRadius: theme.borderRadius.lg,
                overflow: 'hidden',
              }}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={tempValue.trim() 
                  ? [theme.colors.primary.teal, theme.colors.secondary.darkTeal]
                  : [theme.colors.neutral.mediumGray, theme.colors.neutral.mediumGray]}
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
                  {criticalFields.includes(editingField) ? 'Submit for Review' : 'Save'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Logout Modal
  const LogoutModal = () => (
    <Modal
      visible={showLogoutModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowLogoutModal(false)}
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
            maxWidth: 350,
            padding: theme.spacing.xl,
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: theme.colors.status.error,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: theme.spacing.md,
              }}
            >
              <Ionicons
                name="log-out-outline"
                size={28}
                color={theme.colors.neutral.white}
              />
            </View>
            
            <Text
              style={{
                fontSize: theme.typography.sizes.lg,
                fontFamily: theme.typography.fonts.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
                textAlign: 'center',
              }}
            >
              Logout
            </Text>
            <Text
              style={{
                fontSize: theme.typography.sizes.base,
                fontFamily: theme.typography.fonts.regular,
                color: theme.colors.text.secondary,
                textAlign: 'center',
              }}
            >
              Are you sure you want to logout?
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            <TouchableOpacity
              onPress={() => setShowLogoutModal(false)}
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
              onPress={handleLogout}
              style={{
                flex: 1,
                backgroundColor: theme.colors.status.error,
                borderRadius: theme.borderRadius.lg,
                paddingVertical: theme.spacing.md,
                alignItems: 'center',
              }}
              activeOpacity={0.9}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.base,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.neutral.white,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
      >
        <Header />

        <PendingChangesSection />

        {/* Personal Information */}
        <Section title="Personal Information" icon="person-outline">
          <FieldItem
            label="Full Name"
            value={userProfile.fullName}
            field="fullName"
          />
          <FieldItem
            label="Email Address"
            value={userProfile.email}
            field="email"
          />
          <FieldItem
            label="Mobile Number"
            value={userProfile.mobileNumber}
            field="mobileNumber"
          />
          <FieldItem
            label="Address"
            value={userProfile.fullAddress}
            field="fullAddress"
            multiline
          />
        </Section>

        {/* Professional Information */}
        <Section title="Professional Information" icon="briefcase-outline">
          <FieldItem
            label="Current Position"
            value={userProfile.currentPosition}
            field="currentPosition"
          />
          <FieldItem
            label="Function"
            value={userProfile.function}
            field="function"
          />
          <FieldItem
            label="Years of Experience"
            value={userProfile.yearsOfExperience}
            field="yearsOfExperience"
          />
          <FieldItem
            label="Education"
            value={userProfile.education}
            field="education"
          />
          <FieldItem
            label="Institution"
            value={userProfile.institution}
            field="institution"
          />
          <FieldItem
            label="Preferred Location"
            value={userProfile.location}
            field="location"
          />
          <FieldItem
            label="Industry Nature"
            value={userProfile.industryNature}
            field="industryNature"
          />
          <FieldItem
            label="Work Type"
            value={userProfile.workType}
            field="workType"
          />
          <FieldItem
            label="Area of Interest"
            value={userProfile.areaOfInterest}
            field="areaOfInterest"
          />
        </Section>

        {/* Skills */}
        <Section title="Skills & Expertise" icon="code-slash-outline">
          <SkillsSection />
        </Section>

        {/* Account Information */}
        <Section title="Account Information" icon="settings-outline">
          <FieldItem
            label="Account Status"
            value={userProfile.accountStatus}
            field="accountStatus"
            editable={false}
          />
          <FieldItem
            label="Subscription"
            value={`${userProfile.subscriptionStatus} (expires ${userProfile.subscriptionExpiry})`}
            field="subscription"
            editable={false}
          />
          <FieldItem
            label="Member Since"
            value={userProfile.joinDate}
            field="joinDate"
            editable={false}
          />
          <FieldItem
            label="Last Active"
            value={userProfile.lastActive}
            field="lastActive"
            editable={false}
          />
        </Section>

        {/* Account Actions */}
        <Section title="Account Actions" icon="cog-outline">
          <TouchableOpacity
            onPress={() => setShowLogoutModal(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: theme.spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border.light,
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color={theme.colors.status.error}
              style={{ marginRight: theme.spacing.md }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.typography.sizes.base,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.status.error,
                }}
              >
                Logout
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.tertiary,
                }}
              >
                Sign out of your account
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={theme.colors.text.tertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Help & Support',
                'Contact our support team for assistance.',
                [{ text: 'OK' }]
              );
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: theme.spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border.light,
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name="help-circle-outline"
              size={20}
              color={theme.colors.primary.teal}
              style={{ marginRight: theme.spacing.md }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.typography.sizes.base,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.text.primary,
                }}
              >
                Help & Support
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.tertiary,
                }}
              >
                Get help with your account
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={theme.colors.text.tertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Privacy Policy',
                'View our privacy policy and terms of service.',
                [{ text: 'OK' }]
              );
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: theme.spacing.md,
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name="document-text-outline"
              size={20}
              color={theme.colors.primary.teal}
              style={{ marginRight: theme.spacing.md }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.typography.sizes.base,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.text.primary,
                }}
              >
                Privacy & Terms
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.tertiary,
                }}
              >
                Review privacy policy and terms
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={theme.colors.text.tertiary}
            />
          </TouchableOpacity>
        </Section>
      </ScrollView>

      <EditModal />
      <LogoutModal />
    </View>
  );
}