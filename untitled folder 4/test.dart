import 'package:flutter/material.dart';

class AnalyticsPage extends StatelessWidget {
  const AnalyticsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Title Container
        Container(
          height: 50,
          width: double.infinity,
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: const Text(
            'Weight Analytics',
            style: TextStyle(
              color: Color(0xFF252727),
              fontSize: 22,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),

        // Body Container
        Expanded(
          child: Container(
            color: Colors.grey[200],
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Weight Card
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFF1E0), // Light peach background
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Current Weight Row
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                              color: Color(0xFFFFE0B2), // orange circle
                            ),
                            child: const Icon(Icons.fitness_center,
                                color: Colors.black, size: 20),
                          ),
                          const SizedBox(width: 12),
                          const Text(
                            "Current Weight",
                            style: TextStyle(
                              color: Color(0xFF252727),
                              fontWeight: FontWeight.w600,
                              fontSize: 16,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        "188 lbs",
                        style: TextStyle(
                            color: Color(0xFF252727),
                            fontWeight: FontWeight.bold,
                            fontSize: 24),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        "Remember to update this at least once a week so we can adjust your plan to hit your goal",
                        style: TextStyle(
                          color: Color(0xFF252727),
                          fontSize: 12,
                        ),
                      ),

                      const SizedBox(height: 16),
                      const Divider(color: Colors.grey),
                      const SizedBox(height: 8),

                      // Target Weight
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                              color: Color(0xFFFFB380), // darker orange
                            ),
                            child: const Icon(Icons.emoji_events,
                                color: Colors.white, size: 20),
                          ),
                          const SizedBox(width: 12),
                          const Text(
                            "Target Weight",
                            style: TextStyle(
                              color: Color(0xFF8C7A6B),
                              fontWeight: FontWeight.w500,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        "210 lbs",
                        style: TextStyle(
                            color: Color(0xFF252727),
                            fontWeight: FontWeight.bold,
                            fontSize: 16),
                      ),
                      const SizedBox(height: 8),

                      // Progress Bar
                      Stack(
                        children: [
                          Container(
                            height: 8,
                            decoration: BoxDecoration(
                              color: Colors.grey[300],
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                          FractionallySizedBox(
                            widthFactor: 0.66, // 66% progress
                            child: Container(
                              height: 8,
                              decoration: BoxDecoration(
                                color: Colors.orange,
                                borderRadius: BorderRadius.circular(4),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      const Align(
                        alignment: Alignment.centerRight,
                        child: Text(
                          "66%",
                          style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                              color: Color(0xFF252727)),
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Log Weight Button
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.black,
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8)),
                          ),
                          onPressed: () {},
                          child: const Text(
                            "Log Weight",
                            style: TextStyle(fontSize: 16),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
