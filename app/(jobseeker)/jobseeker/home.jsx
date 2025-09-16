import theme from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function JobSeekerHome() {
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - replace with real data from API
  const [userProfile] = useState({
    profileCompletion: 85,
    subscriptionStatus: 'Active',
    subscriptionExpiry: '2024-12-15',
  });

  const [aiRecommendations] = useState([
    {
      id: '1',
      companyName: 'TechCorp Solutions',
      position: 'Senior React Developer',
      location: 'Mumbai, Remote',
      matchPercentage: 95,
      skills: ['React', 'Node.js', 'TypeScript'],
      postedTime: '2 hours ago',
      companyLogo: null,
    },
    {
      id: '2',
      companyName: 'Digital Innovations',
      position: 'Full Stack Developer',
      location: 'Bangalore',
      matchPercentage: 88,
      skills: ['React Native', 'Python', 'AWS'],
      postedTime: '5 hours ago',
      companyLogo: null,
    },
    {
      id: '3',
      companyName: 'StartupHub',
      position: 'Frontend Engineer',
      location: 'Pune, Hybrid',
      matchPercentage: 82,
      skills: ['React', 'Vue.js', 'JavaScript'],
      postedTime: '1 day ago',
      companyLogo: null,
    },
  ]);

  const [recentActivity] = useState([
    {
      id: '1',
      type: 'match',
      message: 'TechCorp Solutions viewed your profile',
      time: '1 hour ago',
      icon: 'eye-outline',
      color: theme.colors.primary.teal,
    },
    {
      id: '2',
      type: 'interview',
      message: 'Interview scheduled with Digital Innovations',
      time: '3 hours ago',
      icon: 'videocam-outline',
      color: theme.colors.primary.orange,
    },
    {
      id: '3',
      type: 'message',
      message: 'New message from StartupHub',
      time: '6 hours ago',
      icon: 'chatbubble-outline',
      color: theme.colors.primary.deepBlue,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Stats Cards Component
  const StatsCards = () => (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        gap: theme.spacing.sm,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background.card,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(27, 163, 163, 0.05)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: theme.borderRadius.lg,
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="person-circle-outline"
            size={20}
            color={theme.colors.primary.teal}
            style={{ marginRight: theme.spacing.xs }}
          />
          <Text
            style={{
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Profile
          </Text>
        </View>
        <Text
          style={{
            fontSize: theme.typography.sizes.lg,
            fontFamily: theme.typography.fonts.bold,
            color: theme.colors.primary.teal,
            marginTop: theme.spacing.xs,
          }}
        >
          {userProfile.profileCompletion}%
        </Text>
        <Text
          style={{
            fontSize: theme.typography.sizes.xs,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.text.tertiary,
          }}
        >
          Complete
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background.card,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255, 138, 61, 0.05)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: theme.borderRadius.lg,
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="heart-outline"
            size={20}
            color={theme.colors.primary.orange}
            style={{ marginRight: theme.spacing.xs }}
          />
          <Text
            style={{
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Matches
          </Text>
        </View>
        <Text
          style={{
            fontSize: theme.typography.sizes.lg,
            fontFamily: theme.typography.fonts.bold,
            color: theme.colors.primary.orange,
            marginTop: theme.spacing.xs,
          }}
        >
          12
        </Text>
        <Text
          style={{
            fontSize: theme.typography.sizes.xs,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.text.tertiary,
          }}
        >
          New today
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background.card,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(30, 74, 114, 0.05)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: theme.borderRadius.lg,
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={theme.colors.primary.deepBlue}
            style={{ marginRight: theme.spacing.xs }}
          />
          <Text
            style={{
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Interviews
          </Text>
        </View>
        <Text
          style={{
            fontSize: theme.typography.sizes.lg,
            fontFamily: theme.typography.fonts.bold,
            color: theme.colors.primary.deepBlue,
            marginTop: theme.spacing.xs,
          }}
        >
          3
        </Text>
        <Text
          style={{
            fontSize: theme.typography.sizes.xs,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.text.tertiary,
          }}
        >
          Scheduled
        </Text>
      </View>
    </View>
  );

  // AI Recommendations Card
  const RecommendationCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/job-details/${item.id}`)}
      style={{
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
      }}
      activeOpacity={0.9}
    >
      {/* Match percentage badge */}
      <View
        style={{
          position: 'absolute',
          top: theme.spacing.sm,
          right: theme.spacing.sm,
          backgroundColor: theme.colors.status.success,
          borderRadius: theme.borderRadius.full,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.sizes.xs,
            fontFamily: theme.typography.fonts.bold,
            color: theme.colors.neutral.white,
          }}
        >
          {item.matchPercentage}% Match
        </Text>
      </View>

      {/* Company header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.colors.background.accent,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: theme.spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fonts.bold,
              color: theme.colors.primary.teal,
            }}
          >
            {item.companyName.charAt(0)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: theme.typography.sizes.base,
              fontFamily: theme.typography.fonts.semiBold,
              color: theme.colors.text.primary,
            }}
          >
            {item.companyName}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fonts.regular,
              color: theme.colors.text.secondary,
            }}
          >
            {item.postedTime}
          </Text>
        </View>
      </View>

      {/* Position and location */}
      <Text
        style={{
          fontSize: theme.typography.sizes.md,
          fontFamily: theme.typography.fonts.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.xs,
        }}
      >
        {item.position}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
        <Ionicons
          name="location-outline"
          size={14}
          color={theme.colors.text.tertiary}
          style={{ marginRight: theme.spacing.xs }}
        />
        <Text
          style={{
            fontSize: theme.typography.sizes.sm,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.text.secondary,
          }}
        >
          {item.location}
        </Text>
      </View>

      {/* Skills */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: theme.spacing.sm }}>
        {item.skills.map((skill, index) => (
          <View
            key={index}
            style={{
              backgroundColor: theme.colors.background.accent,
              borderRadius: theme.borderRadius.sm,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              marginRight: theme.spacing.xs,
              marginBottom: theme.spacing.xs,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.xs,
                fontFamily: theme.typography.fonts.medium,
                color: theme.colors.primary.teal,
              }}
            >
              {skill}
            </Text>
          </View>
        ))}
      </View>

      {/* Action buttons */}
      <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: theme.colors.neutral.lightGray,
            borderRadius: theme.borderRadius.md,
            paddingVertical: theme.spacing.sm,
            alignItems: 'center',
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fonts.medium,
              color: theme.colors.text.secondary,
            }}
          >
            Save for Later
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            borderRadius: theme.borderRadius.md,
            overflow: 'hidden',
          }}
          onPress={() => router.push(`/job-details/${item.id}`)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[theme.colors.primary.teal, theme.colors.secondary.darkTeal]}
            style={{
              paddingVertical: theme.spacing.sm,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.semiBold,
                color: theme.colors.neutral.white,
              }}
            >
              View Details
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Recent Activity Item
  const ActivityItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: `${item.color}15`,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: theme.spacing.md,
        }}
      >
        <Ionicons
          name={item.icon}
          size={18}
          color={item.color}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: theme.typography.sizes.sm,
            fontFamily: theme.typography.fonts.medium,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.xs,
          }}
        >
          {item.message}
        </Text>
        <Text
          style={{
            fontSize: theme.typography.sizes.xs,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.text.tertiary,
          }}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  // Create a single data array for the FlatList
  const createFlatListData = () => {
    const data = [
      { type: 'stats', id: 'stats' },
      { type: 'recommendations-header', id: 'recommendations-header' },
      ...aiRecommendations.map(item => ({ type: 'recommendation', ...item })),
      { type: 'activity-header', id: 'activity-header' },
      { type: 'activity-container', id: 'activity-container' },
    ];
    return data;
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'stats':
        return <StatsCards />;
      
      case 'recommendations-header':
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: theme.spacing.lg,
              marginBottom: theme.spacing.md,
              marginTop: theme.spacing.md,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.md,
                fontFamily: theme.typography.fonts.bold,
                color: theme.colors.text.primary,
              }}
            >
              Latest Recommendations
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.primary.teal,
                }}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'recommendation':
        return <RecommendationCard item={item} />;
      
      case 'activity-header':
        return (
          <Text
            style={{
              fontSize: theme.typography.sizes.md,
              fontFamily: theme.typography.fonts.bold,
              color: theme.colors.text.primary,
              paddingHorizontal: theme.spacing.lg,
              marginBottom: theme.spacing.md,
              marginTop: theme.spacing.lg,
            }}
          >
            Recent Activity
          </Text>
        );
      
      case 'activity-container':
        return (
          <View
            style={{
              backgroundColor: theme.colors.background.card,
              marginHorizontal: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
              borderWidth: 1,
              borderColor: theme.colors.border.light,
              marginBottom: theme.spacing.xl,
            }}
          >
            {recentActivity.map((activityItem, index) => (
              <View key={activityItem.id}>
                <ActivityItem item={activityItem} />
                {index < recentActivity.length - 1 && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: theme.colors.border.light,
                      marginLeft: theme.spacing.lg + 36 + theme.spacing.md,
                      marginRight: theme.spacing.lg,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
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
        locations={[0, 0.3, 1]}
      />

      <FlatList
        data={createFlatListData()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary.teal]}
            tintColor={theme.colors.primary.teal}
          />
        }
      />
    </View>
  );
}