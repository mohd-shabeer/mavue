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
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function EmployerJobs() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'active', 'paused', 'expired'

  // Mock jobs data
  const [jobs] = useState([
    {
      id: '1',
      title: 'Senior React Developer',
      location: 'Mumbai, Remote',
      employmentType: 'Full-time',
      experience: '3-5 years',
      salary: '₹8L - ₹15L',
      postedDate: '2024-01-10',
      expiryDate: '2024-02-10',
      status: 'active', // 'active', 'paused', 'expired', 'draft'
      applicationsCount: 45,
      viewsCount: 234,
      urgency: 'high', // 'high', 'medium', 'low'
      skills: ['React', 'Node.js', 'TypeScript'],
      description: 'We are looking for a Senior React Developer to join our team...',
      isUrgent: true,
      newApplications: 12,
    },
    {
      id: '2',
      title: 'Frontend Developer',
      location: 'Bangalore, On-site',
      employmentType: 'Full-time',
      experience: '2-4 years',
      salary: '₹6L - ₹12L',
      postedDate: '2024-01-12',
      expiryDate: '2024-02-12',
      status: 'active',
      applicationsCount: 32,
      viewsCount: 189,
      urgency: 'medium',
      skills: ['React', 'Vue.js', 'CSS'],
      description: 'Join our frontend team to build amazing user experiences...',
      isUrgent: false,
      newApplications: 8,
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      location: 'Pune, Hybrid',
      employmentType: 'Full-time',
      experience: '3-6 years',
      salary: '₹7L - ₹13L',
      postedDate: '2024-01-14',
      expiryDate: '2024-02-14',
      status: 'paused',
      applicationsCount: 28,
      viewsCount: 156,
      urgency: 'low',
      skills: ['React', 'Python', 'AWS'],
      description: 'Looking for a versatile full stack developer...',
      isUrgent: false,
      newApplications: 3,
    },
    {
      id: '4',
      title: 'Backend Developer',
      location: 'Delhi, Remote',
      employmentType: 'Full-time',
      experience: '4-7 years',
      salary: '₹9L - ₹16L',
      postedDate: '2024-01-05',
      expiryDate: '2024-01-20',
      status: 'expired',
      applicationsCount: 67,
      viewsCount: 445,
      urgency: 'medium',
      skills: ['Node.js', 'Python', 'PostgreSQL'],
      description: 'We need an experienced backend developer...',
      isUrgent: false,
      newApplications: 0,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Filter jobs based on active filter and search query
  const getFilteredJobs = () => {
    let filtered = jobs;

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(job => job.status === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  // Get filter stats
  const getFilterStats = () => {
    return {
      all: jobs.length,
      active: jobs.filter(j => j.status === 'active').length,
      paused: jobs.filter(j => j.status === 'paused').length,
      expired: jobs.filter(j => j.status === 'expired').length,
    };
  };

  const stats = getFilterStats();

  // Header Component
  const Header = () => (
    <View
      style={{
        backgroundColor: theme.colors.background.card,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.light,
      }}
    >
      {/* Action Row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.md,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.sizes.lg,
            fontFamily: theme.typography.fonts.bold,
            color: theme.colors.text.primary,
          }}
        >
          Job Postings
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/post-job')}
          style={{
            backgroundColor: theme.colors.primary.teal,
            borderRadius: theme.borderRadius.lg,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add"
            size={16}
            color={theme.colors.neutral.white}
            style={{ marginRight: theme.spacing.xs }}
          />
          <Text
            style={{
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fonts.semiBold,
              color: theme.colors.neutral.white,
            }}
          >
            Post Job
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.neutral.lightGray,
          borderRadius: theme.borderRadius.lg,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          marginBottom: theme.spacing.md,
        }}
      >
        <Ionicons
          name="search"
          size={16}
          color={theme.colors.text.tertiary}
          style={{ marginRight: theme.spacing.sm }}
        />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search jobs by title, location, or skills..."
          placeholderTextColor={theme.colors.text.placeholder}
          style={{
            flex: 1,
            fontSize: theme.typography.sizes.base,
            fontFamily: theme.typography.fonts.regular,
            color: theme.colors.text.primary,
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={{ padding: theme.spacing.xs }}
          >
            <Ionicons
              name="close"
              size={16}
              color={theme.colors.text.tertiary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
        {[
          { id: 'all', label: 'All', count: stats.all },
          { id: 'active', label: 'Active', count: stats.active },
          { id: 'paused', label: 'Paused', count: stats.paused },
          { id: 'expired', label: 'Expired', count: stats.expired },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => setActiveFilter(filter.id)}
            style={{
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.borderRadius.full,
              backgroundColor: activeFilter === filter.id 
                ? theme.colors.primary.teal 
                : theme.colors.background.accent,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: activeFilter === filter.id 
                  ? theme.typography.fonts.semiBold 
                  : theme.typography.fonts.medium,
                color: activeFilter === filter.id 
                  ? theme.colors.neutral.white 
                  : theme.colors.text.secondary,
              }}
            >
              {filter.label}
            </Text>
            {filter.count > 0 && (
              <View
                style={{
                  backgroundColor: activeFilter === filter.id 
                    ? 'rgba(255, 255, 255, 0.3)' 
                    : theme.colors.primary.teal,
                  borderRadius: theme.borderRadius.full,
                  paddingHorizontal: theme.spacing.xs,
                  paddingVertical: 2,
                  marginLeft: theme.spacing.xs,
                  minWidth: 18,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.sizes.xs,
                    fontFamily: theme.typography.fonts.bold,
                    color: theme.colors.neutral.white,
                  }}
                >
                  {filter.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Job Item Component
  const JobItem = ({ item }) => {
    const getStatusColor = () => {
      switch (item.status) {
        case 'active': return theme.colors.status.success;
        case 'paused': return theme.colors.status.warning;
        case 'expired': return theme.colors.status.error;
        default: return theme.colors.text.tertiary;
      }
    };

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
          padding: theme.spacing.lg,
          marginHorizontal: theme.spacing.lg,
          marginBottom: theme.spacing.md,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
          opacity: item.status === 'expired' ? 0.7 : 1,
        }}
        activeOpacity={0.9}
      >
        {/* Header Row */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: theme.spacing.sm }}>
          <View style={{ flex: 1, marginRight: theme.spacing.md }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.xs }}>
              <Text
                style={{
                  fontSize: theme.typography.sizes.base,
                  fontFamily: theme.typography.fonts.semiBold,
                  color: theme.colors.text.primary,
                  flex: 1,
                }}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              {item.isUrgent && (
                <View
                  style={{
                    backgroundColor: theme.colors.status.error,
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
                    URGENT
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                fontSize: theme.typography.sizes.sm,
                fontFamily: theme.typography.fonts.regular,
                color: theme.colors.text.secondary,
              }}
            >
              {item.employmentType} • {item.experience}
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
        </View>

        {/* Job Details */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: theme.spacing.md, gap: theme.spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', minWidth: '45%' }}>
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

          <View style={{ flexDirection: 'row', alignItems: 'center', minWidth: '45%' }}>
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
        </View>

        {/* Skills */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: theme.spacing.md }}>
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
                borderWidth: 1,
                borderColor: theme.colors.primary.teal,
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

        {/* Stats Row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name="person-outline"
                size={16}
                color={theme.colors.primary.teal}
                style={{ marginRight: theme.spacing.xs }}
              />
              <Text
                style={{
                  fontSize: theme.typography.sizes.sm,
                  fontFamily: theme.typography.fonts.medium,
                  color: theme.colors.primary.teal,
                }}
              >
                {item.applicationsCount}
              </Text>
              {item.newApplications > 0 && (
                <View
                  style={{
                    backgroundColor: theme.colors.primary.orange,
                    borderRadius: theme.borderRadius.full,
                    paddingHorizontal: theme.spacing.xs,
                    paddingVertical: 1,
                    marginLeft: theme.spacing.xs,
                    minWidth: 16,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.sizes.xs,
                      fontFamily: theme.typography.fonts.bold,
                      color: theme.colors.neutral.white,
                    }}
                  >
                    {item.newApplications}
                  </Text>
                </View>
              )}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name="eye-outline"
                size={16}
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
                {item.viewsCount}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                fontSize: theme.typography.sizes.xs,
                fontFamily: theme.typography.fonts.regular,
                color: theme.colors.text.tertiary,
              }}
            >
              Posted {item.postedDate}
            </Text>
            <Text
              style={{
                fontSize: theme.typography.sizes.xs,
                fontFamily: theme.typography.fonts.regular,
                color: item.status === 'expired' ? theme.colors.status.error : theme.colors.text.tertiary,
              }}
            >
              Expires {item.expiryDate}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Empty State Component
  const EmptyState = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.xxxl,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: theme.colors.background.accent,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
        }}
      >
        <Ionicons
          name={
            searchQuery ? 'search-outline' :
            activeFilter === 'active' ? 'checkmark-circle-outline' :
            activeFilter === 'paused' ? 'pause-circle-outline' :
            activeFilter === 'expired' ? 'time-outline' :
            'briefcase-outline'
          }
          size={32}
          color={theme.colors.primary.teal}
        />
      </View>

      <Text
        style={{
          fontSize: theme.typography.sizes.lg,
          fontFamily: theme.typography.fonts.semiBold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.sm,
          textAlign: 'center',
        }}
      >
        {searchQuery ? 'No jobs found' :
         activeFilter === 'active' ? 'No active jobs' :
         activeFilter === 'paused' ? 'No paused jobs' :
         activeFilter === 'expired' ? 'No expired jobs' :
         'No jobs posted yet'}
      </Text>

      <Text
        style={{
          fontSize: theme.typography.sizes.base,
          fontFamily: theme.typography.fonts.regular,
          color: theme.colors.text.secondary,
          textAlign: 'center',
          lineHeight: theme.typography.sizes.base * 1.4,
          marginBottom: theme.spacing.lg,
        }}
      >
        {searchQuery ? 'Try adjusting your search terms or filters' :
         activeFilter === 'active' ? 'Your active job postings will appear here' :
         activeFilter === 'paused' ? 'Jobs you pause will appear here' :
         activeFilter === 'expired' ? 'Expired job postings will appear here' :
         'Start by posting your first job to attract talented candidates'}
      </Text>

      {!searchQuery && activeFilter === 'all' && (
        <TouchableOpacity
          onPress={() => router.push('/employer/jobs/create')}
          style={{
            borderRadius: theme.borderRadius.lg,
            overflow: 'hidden',
          }}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[theme.colors.primary.teal, theme.colors.secondary.darkTeal]}
            style={{
              paddingHorizontal: theme.spacing.xl,
              paddingVertical: theme.spacing.md,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name="add"
              size={18}
              color={theme.colors.neutral.white}
              style={{ marginRight: theme.spacing.sm }}
            />
            <Text
              style={{
                fontSize: theme.typography.sizes.base,
                fontFamily: theme.typography.fonts.semiBold,
                color: theme.colors.neutral.white,
              }}
            >
              Post Your First Job
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );

  const filteredJobs = getFilteredJobs();

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

      <Header />
      
      {filteredJobs.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filteredJobs}
          renderItem={({ item }) => <JobItem item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: theme.spacing.md }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary.teal]}
              tintColor={theme.colors.primary.teal}
            />
          }
        />
      )}
    </View>
  );
}