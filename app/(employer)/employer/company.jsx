import theme from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CompanyProfile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Company profile data
  const [companyProfile, setCompanyProfile] = useState({
    // Basic Info
    companyName: 'TechCorp Solutions',
    industry: 'Information Technology',
    companySize: '500-1000 employees',
    foundedYear: '2015',
    website: 'www.techcorpsolutions.com',
    headquarters: 'Mumbai, Maharashtra, India',
    
    // Contact Info
    email: 'hr@techcorpsolutions.com',
    phone: '+91 22 1234 5678',
    address: '15th Floor, Tech Tower, Bandra Kurla Complex, Mumbai, Maharashtra 400051',
    
    // Company Details
    description: 'TechCorp Solutions is a leading software development company specializing in web and mobile applications. We work with clients across various industries to deliver innovative technology solutions that drive business growth.',
    mission: 'To empower businesses through innovative technology solutions and create meaningful career opportunities for talented professionals.',
    vision: 'To be the most trusted technology partner for businesses worldwide while fostering a culture of innovation and excellence.',
    values: 'Innovation, Excellence, Integrity, Collaboration, Customer Focus',
    
    // Benefits & Culture
    benefits: [
      'Comprehensive health insurance',
      'Flexible working hours',
      'Remote work options',
      'Professional development budget',
      'Performance bonuses',
      'Modern office environment',
      'Team outings and events',
      'Learning and development programs'
    ],
    
    workCulture: 'We believe in a collaborative, innovative work environment where every team member is valued and empowered to contribute their best work.',
    
    // Subscription & Account
    subscriptionPlan: 'Premium',
    subscriptionExpiry: '2025-07-15',
    accountStatus: 'Active',
    joinDate: '2024-01-15',
    totalJobsPosted: 24,
    totalHires: 18,
    
    // Social Links
    socialLinks: {
      linkedin: 'linkedin.com/company/techcorp-solutions',
      twitter: 'twitter.com/techcorpsolutions',
      facebook: 'facebook.com/techcorpsolutions',
    },
  });

  const handleEditField = (field, currentValue) => {
    setEditingField(field);
    setTempValue(Array.isArray(currentValue) ? currentValue.join(', ') : currentValue);
    setShowEditModal(true);
  };

  const handleSaveField = () => {
    if (!tempValue.trim()) return;

    let processedValue = tempValue.trim();
    
    // Handle benefits array
    if (editingField === 'benefits') {
      processedValue = tempValue.split(',').map(item => item.trim()).filter(item => item);
    }

    setCompanyProfile(prev => ({
      ...prev,
      [editingField]: processedValue
    }));

    Alert.alert(
      'Profile Updated',
      'Your company profile has been updated successfully.',
      [{ text: 'OK' }]
    );

    setShowEditModal(false);
    setEditingField(null);
    setTempValue('');
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
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
      {/* Company Logo and Basic Info */}
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
          <Image
            source={require('@/assets/images/company/logo.png')}
            style={{
              width: 50,
              height: 50,
            }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontSize: theme.typography.sizes.lg,
            fontFamily: theme.typography.fonts.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.xs,
          }}
        >
          {companyProfile.companyName}
        </Text>

        <Text
          style={{
            fontSize: theme.typography.sizes.base,
            fontFamily: theme.typography.fonts.medium,
            color: theme.colors.primary.teal,
            marginBottom: theme.spacing.xs,
          }}
        >
          {companyProfile.industry}
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
            Verified Company
          </Text>
        </View>
      </View>

      {/* Company Stats */}
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
            {companyProfile.totalJobsPosted}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.sizes.xs,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Jobs Posted
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
            {companyProfile.totalHires}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.sizes.xs,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Successful Hires
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
            {companyProfile.companySize.split('-')[0]}+
          </Text>
          <Text
            style={{
              fontSize: theme.typography.sizes.xs,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Employees
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
        <Text
          style={{
            fontSize: theme.typography.sizes.base,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.text.primary,
            lineHeight: theme.typography.sizes.base * 1.3,
          }}
        >
          {Array.isArray(value) ? value.join(', ') : value}
        </Text>
      </View>
      
      {editable && (
        <TouchableOpacity
          onPress={() => handleEditField(field, value)}
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

  // Benefits Component
  const BenefitsSection = () => (
    <View style={{ marginTop: theme.spacing.sm }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {companyProfile.benefits.map((benefit, index) => (
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
              {benefit}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => handleEditField('benefits', companyProfile.benefits)}
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
          Edit Benefits
        </Text>
      </TouchableOpacity>
    </View>
  );

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

          <TextInput
            value={tempValue}
            onChangeText={setTempValue}
            placeholder={`Enter ${editingField}`}
            placeholderTextColor={theme.colors.text.placeholder}
            multiline={editingField === 'description' || editingField === 'address' || editingField === 'benefits' || editingField === 'mission' || editingField === 'vision' || editingField === 'workCulture'}
            numberOfLines={editingField === 'description' || editingField === 'address' || editingField === 'benefits' || editingField === 'mission' || editingField === 'vision' || editingField === 'workCulture' ? 4 : 1}
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
              minHeight: editingField === 'description' || editingField === 'address' || editingField === 'benefits' || editingField === 'mission' || editingField === 'vision' || editingField === 'workCulture' ? 100 : 50,
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
                  Save
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

        {/* Company Information */}
        <Section title="Company Information" icon="business-outline">
          <FieldItem
            label="Company Name"
            value={companyProfile.companyName}
            field="companyName"
          />
          <FieldItem
            label="Industry"
            value={companyProfile.industry}
            field="industry"
          />
          <FieldItem
            label="Company Size"
            value={companyProfile.companySize}
            field="companySize"
          />
          <FieldItem
            label="Founded Year"
            value={companyProfile.foundedYear}
            field="foundedYear"
          />
          <FieldItem
            label="Website"
            value={companyProfile.website}
            field="website"
          />
          <FieldItem
            label="Headquarters"
            value={companyProfile.headquarters}
            field="headquarters"
          />
        </Section>

        {/* Contact Information */}
        <Section title="Contact Information" icon="call-outline">
          <FieldItem
            label="Email Address"
            value={companyProfile.email}
            field="email"
          />
          <FieldItem
            label="Phone Number"
            value={companyProfile.phone}
            field="phone"
          />
          <FieldItem
            label="Address"
            value={companyProfile.address}
            field="address"
            multiline
          />
        </Section>

        {/* Company Details */}
        <Section title="About Company" icon="document-text-outline">
          <FieldItem
            label="Company Description"
            value={companyProfile.description}
            field="description"
            multiline
          />
          <FieldItem
            label="Mission"
            value={companyProfile.mission}
            field="mission"
            multiline
          />
          <FieldItem
            label="Vision"
            value={companyProfile.vision}
            field="vision"
            multiline
          />
          <FieldItem
            label="Core Values"
            value={companyProfile.values}
            field="values"
          />
          <FieldItem
            label="Work Culture"
            value={companyProfile.workCulture}
            field="workCulture"
            multiline
          />
        </Section>

        {/* Benefits & Perks */}
        <Section title="Benefits & Perks" icon="gift-outline">
          <BenefitsSection />
        </Section>

        {/* Social Links */}
        <Section title="Social Media" icon="share-social-outline">
          <FieldItem
            label="LinkedIn"
            value={companyProfile.socialLinks.linkedin}
            field="linkedin"
          />
          <FieldItem
            label="Twitter"
            value={companyProfile.socialLinks.twitter}
            field="twitter"
          />
          <FieldItem
            label="Facebook"
            value={companyProfile.socialLinks.facebook}
            field="facebook"
          />
        </Section>

        {/* Account Information */}
        <Section title="Account Information" icon="settings-outline">
          <FieldItem
            label="Subscription Plan"
            value={`${companyProfile.subscriptionPlan} (expires ${companyProfile.subscriptionExpiry})`}
            field="subscription"
            editable={false}
          />
          <FieldItem
            label="Account Status"
            value={companyProfile.accountStatus}
            field="accountStatus"
            editable={false}
          />
          <FieldItem
            label="Member Since"
            value={companyProfile.joinDate}
            field="joinDate"
            editable={false}
          />
        </Section>

        {/* Account Actions */}
        <Section title="Account Actions" icon="cog-outline">
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Billing & Subscription',
                'Manage your subscription and billing details.',
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
              name="card-outline"
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
                Billing & Subscription
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.tertiary,
                }}
              >
                Manage subscription and payments
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
            onPress={() => setShowLogoutModal(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: theme.spacing.md,
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
        </Section>
      </ScrollView>

      <EditModal />
      <LogoutModal />
    </View>
  );
}