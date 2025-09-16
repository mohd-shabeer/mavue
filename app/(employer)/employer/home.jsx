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
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function EmployerHome() {
  const [refreshing, setRefreshing] = useState(false);

  // Mock company data and statistics
  const [dashboardData] = useState({
    company: {
      name: 'TechCorp Solutions',
      plan: 'Premium',
      planExpiry: '2025-07-15',
    },
    stats: {
      activeJobs: 12,
      totalApplications: 248,
      newApplications: 23,
      shortlistedCandidates: 45,
      interviewsScheduled: 8,
      hiredThisMonth: 3,
    },
    recentApplications: [
      {
        id: '1',
        candidateName: 'John Smith',
        candidateInitials: 'JS',
        position: 'Senior React Developer',
        appliedTime: '2 hours ago',
        experience: '5 years',
        location: 'Mumbai',
        skills: ['React', 'Node.js', 'TypeScript'],
        matchPercentage: 95,
        status: 'new', // 'new', 'reviewed', 'shortlisted', 'rejected'
        resumeUrl: null,
      },
      {
        id: '2',
        candidateName: 'Sarah Johnson',
        candidateInitials: 'SJ',
        position: 'Frontend Developer',
        appliedTime: '4 hours ago',
        experience: '3 years',
        location: 'Bangalore',
        skills: ['React', 'Vue.js', 'CSS'],
        matchPercentage: 88,
        status: 'reviewed',
        resumeUrl: null,
      },
      {
        id: '3',
        candidateName: 'Mike Chen',
        candidateInitials: 'MC',
        position: 'Full Stack Developer',
        appliedTime: '1 day ago',
        experience: '4 years',
        location: 'Pune',
        skills: ['React', 'Python', 'AWS'],
        matchPercentage: 82,
        status: 'shortlisted',
        resumeUrl: null,
      },
    ],
    activeJobs: [
      {
        id: '1',
        title: 'Senior React Developer',
        location: 'Mumbai, Remote',
        postedDate: '2024-01-10',
        applicationsCount: 45,
        status: 'active',
        urgency: 'high',
        salary: '₹8L - ₹15L',
      },
      {
        id: '2',
        title: 'Frontend Developer',
        location: 'Bangalore',
        postedDate: '2024-01-12',
        applicationsCount: 32,
        status: 'active',
        urgency: 'medium',
        salary: '₹6L - ₹12L',
      },
      {
        id: '3',
        title: 'Full Stack Developer',
        location: 'Pune, Hybrid',
        postedDate: '2024-01-14',
        applicationsCount: 28,
        status: 'active',
        urgency: 'low',
        salary: '₹7L - ₹13L',
      },
    ],
    recentActivity: [
      {
        id: '1',
        type: 'application',
        message: 'John Smith applied for Senior React Developer',
        time: '2 hours ago',
        icon: 'person-add-outline',
        color: theme.colors.primary.teal,
      },
      {
        id: '2',
        type: 'interview',
        message: 'Interview scheduled with Sarah Johnson tomorrow at 2 PM',
        time: '3 hours ago',
        icon: 'calendar-outline',
        color: theme.colors.primary.orange,
      },
      {
        id: '3',
        type: 'shortlist',
        message: 'Mike Chen was shortlisted for Full Stack Developer',
        time: '5 hours ago',
        icon: 'star-outline',
        color: theme.colors.status.success,
      },
      {
        id: '4',
        type: 'job_expired',
        message: 'Backend Developer job posting expired',
        time: '1 day ago',
        icon: 'time-outline',
        color: theme.colors.status.warning,
      },
    ],
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Stats Cards Component
  const StatsCards = () => (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        gap: theme.spacing.sm,
      }}
    >
      {[
        {
          title: 'Active Jobs',
          value: dashboardData.stats.activeJobs,
          icon: 'briefcase-outline',
          color: theme.colors.primary.teal,
          onPress: () => router.push('/employer/jobs'),
        },
        {
          title: 'New Applications',
          value: dashboardData.stats.newApplications,
          icon: 'person-add-outline',
          color: theme.colors.primary.orange,
          onPress: () => router.push('/employer/applications'),
        },
        {
          title: 'Shortlisted',
          value: dashboardData.stats.shortlistedCandidates,
          icon: 'star-outline',
          color: theme.colors.status.success,
          onPress: () => router.push('/employer/candidates'),
        },
        {
          title: 'Interviews',
          value: dashboardData.stats.interviewsScheduled,
          icon: 'calendar-outline',
          color: theme.colors.primary.deepBlue,
          onPress: () => router.push('/employer/interviews'),
        },
      ].map((stat, index) => (
        <TouchableOpacity
          key={index}
          onPress={stat.onPress}
          style={{
            backgroundColor: theme.colors.background.card,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.md,
            width: (width - theme.spacing.lg * 2 - theme.spacing.sm) / 2,
            borderWidth: 1,
            borderColor: theme.colors.border.light,
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['transparent', `${stat.color}10`]}
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
              name={stat.icon}
              size={20}
              color={stat.color}
              style={{ marginRight: theme.spacing.xs }}
            />
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.medium,
                color: theme.colors.text.secondary,
                flex: 1,
              }}
            >
              {stat.title}
            </Text>
          </View>
          <Text
            style={{
              fontSize: theme.typography.sizes.xxl,
              fontFamily: theme.typography.fonts.bold,
              color: stat.color,
              marginTop: theme.spacing.xs,
            }}
          >
            {stat.value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Recent Applications Component
  const ApplicationCard = ({ item }) => {
    const getStatusColor = () => {
      switch (item.status) {
        case 'new': return theme.colors.primary.orange;
        case 'shortlisted': return theme.colors.status.success;
        case 'rejected': return theme.colors.status.error;
        default: return theme.colors.text.tertiary;
      }
    };

    return (
      <TouchableOpacity
        onPress={() => router.push(`/employer/candidates/${item.id}`)}
        style={{
          backgroundColor: theme.colors.background.card,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          marginHorizontal: theme.spacing.lg,
          marginBottom: theme.spacing.sm,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
        }}
        activeOpacity={0.9}
      >
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: item.status === 'new' 
                ? theme.colors.primary.orange 
                : theme.colors.background.accent,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: theme.spacing.md,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.bold,
                color: item.status === 'new' 
                  ? theme.colors.neutral.white 
                  : theme.colors.primary.teal,
              }}
            >
              {item.candidateInitials}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: theme.typography.sizes.base,
                fontFamily: theme.typography.fonts.semiBold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
              }}
            >
              {item.candidateName}
            </Text>
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.regular,
                color: theme.colors.text.secondary,
              }}
            >
              Applied for {item.position}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={{
                backgroundColor: `${getStatusColor()}15`,
                borderRadius: theme.borderRadius.sm,
                paddingHorizontal: theme.spacing.xs,
                paddingVertical: 2,
                marginBottom: theme.spacing.xs,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.xs,
                  fontFamily: theme.typography.fonts.medium,
                  color: getStatusColor(),
                  textTransform: 'capitalize',
                }}
              >
                {item.status}
              </Text>
            </View>

            <View
              style={{
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
                {item.matchPercentage}%
              </Text>
            </View>
          </View>
        </View>

        {/* Details */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: theme.spacing.md }}>
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

          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: theme.spacing.md }}>
            <Ionicons
              name="time-outline"
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
              {item.experience}
            </Text>
          </View>

          <Text
            style={{
              fontSize: theme.typography.sizes.xs,
              fontFamily: theme.typography.fonts.regular,
              color: theme.colors.text.tertiary,
            }}
          >
            {item.appliedTime}
          </Text>
        </View>

        {/* Skills */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {item.skills.slice(0, 3).map((skill, index) => (
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
          {item.skills.length > 3 && (
            <View
              style={{
                backgroundColor: theme.colors.neutral.lightGray,
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
                  color: theme.colors.text.tertiary,
                }}
              >
                +{item.skills.length - 3}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Job Card Component
  const JobCard = ({ item }) => {
    const getUrgencyColor = () => {
      switch (item.urgency) {
        case 'high': return theme.colors.status.error;
        case 'medium': return theme.colors.status.warning;
        default: return theme.colors.status.success;
      }
    };

    return (
      <TouchableOpacity
        onPress={() => router.push(`/employer/jobs/${item.id}`)}
        style={{
          backgroundColor: theme.colors.background.card,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          marginHorizontal: theme.spacing.lg,
          marginBottom: theme.spacing.sm,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
        }}
        activeOpacity={0.9}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: theme.typography.sizes.base,
                fontFamily: theme.typography.fonts.semiBold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
              }}
            >
              {item.title}
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
                  marginRight: theme.spacing.md,
                }}
              >
                {item.location}
              </Text>

              <Ionicons
                name="cash-outline"
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
                {item.salary}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.primary.teal,
                  marginRight: theme.spacing.md,
                }}
              >
                {item.applicationsCount} applications
              </Text>

              <Text
                style={{
                  fontSize: theme.typography.sizes.xs,
                  fontFamily: theme.typography.fonts.regular,
                  color: theme.colors.text.tertiary,
                }}
              >
                Posted {item.postedDate}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: `${getUrgencyColor()}15`,
              borderRadius: theme.borderRadius.sm,
              paddingHorizontal: theme.spacing.xs,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.xs,
                fontFamily: theme.typography.fonts.medium,
                color: getUrgencyColor(),
                textTransform: 'capitalize',
              }}
            >
              {item.urgency}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Activity Item Component
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

  // Create FlatList data
  const createFlatListData = () => {
    const data = [
      { type: 'stats', id: 'stats' },
      { type: 'applications-header', id: 'applications-header' },
      ...dashboardData.recentApplications.map((item, index) => ({ type: 'application', ...item, id: `application-${item.id}` })),
      { type: 'jobs-header', id: 'jobs-header' },
      ...dashboardData.activeJobs.map((item, index) => ({ type: 'job', ...item, id: `job-${item.id}` })),
      { type: 'activity-header', id: 'activity-header' },
      { type: 'activity-container', id: 'activity-container' },
    ];
    return data;
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'stats':
        return <StatsCards />;
      
      case 'applications-header':
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
              Recent Applications
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/employer/applications')}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.primary.teal,
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'application':
        return <ApplicationCard item={item} />;
      
      case 'jobs-header':
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: theme.spacing.lg,
              marginBottom: theme.spacing.md,
              marginTop: theme.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.md,
                fontFamily: theme.typography.fonts.bold,
                color: theme.colors.text.primary,
              }}
            >
              Active Job Postings
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/employer/jobs')}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.primary.teal,
                }}
              >
                Manage All
              </Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'job':
        return <JobCard item={item} />;
      
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
            {dashboardData.recentActivity.map((activityItem, index) => (
              <View key={activityItem.id}>
                <ActivityItem item={activityItem} />
                {index < dashboardData.recentActivity.length - 1 && (
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