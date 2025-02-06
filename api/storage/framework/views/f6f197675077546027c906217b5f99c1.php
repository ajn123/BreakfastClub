<?php $__env->startSection('content'); ?>
    <h1>Welcome to The Breakfast Club!</h1>
    
    <p>Hi <?php echo e($user->name); ?>,</p>
    
    <p>We're thrilled to have you join The Breakfast Club community in DC! Get ready for amazing conversations, delicious food, and meaningful connections over the most important meal of the day.</p>
    
    <p>To get started:</p>
    <ul style="margin-bottom: 20px;">
        <li>Complete your profile</li>
        <li>Browse upcoming breakfast meetups</li>
        <li>Join your first breakfast gathering</li>
    </ul>

    <div style="text-align: center;">
        <a href="<?php echo e(route('dashboard')); ?>" class="button">
            Start Your Journey
        </a>
    </div>
    
    <p style="margin-top: 30px;">
        See you at breakfast!<br>
        The Breakfast Club Team
    </p>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('emails.layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/emails/welcome.blade.php ENDPATH**/ ?>