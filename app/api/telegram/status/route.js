import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '8306788744:AAEupHI0I1zwmEvy_WdtoGO-mFnZeP904kA';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

async function makeRequest(endpoint) {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Error making request to ${endpoint}:`, error);
    return { ok: false, error: error.message };
  }
}

export async function GET() {
  try {
    console.log('🔍 Checking Telegram bot status...');
    
    // Get bot info
    const botInfo = await makeRequest('getMe');
    
    // Get webhook info  
    const webhookInfo = await makeRequest('getWebhookInfo');
    
    // Get commands
    const commandsInfo = await makeRequest('getMyCommands');
    
    // Get menu button
    const menuInfo = await makeRequest('getChatMenuButton');
    
    // Get description
    const descInfo = await makeRequest('getMyDescription');
    
    // Get short description
    const shortDescInfo = await makeRequest('getMyShortDescription');
    
    // Get recent updates
    const updatesInfo = await makeRequest('getUpdates?limit=5');
    
    const status = {
      timestamp: new Date().toISOString(),
      bot_info: botInfo.ok ? {
        id: botInfo.result.id,
        username: botInfo.result.username,
        first_name: botInfo.result.first_name,
        can_join_groups: botInfo.result.can_join_groups,
        can_read_all_group_messages: botInfo.result.can_read_all_group_messages,
        supports_inline_queries: botInfo.result.supports_inline_queries
      } : { error: 'Failed to get bot info' },
      
      webhook: webhookInfo.ok ? {
        url: webhookInfo.result.url,
        has_custom_certificate: webhookInfo.result.has_custom_certificate,
        pending_update_count: webhookInfo.result.pending_update_count,
        last_error_date: webhookInfo.result.last_error_date,
        last_error_message: webhookInfo.result.last_error_message,
        max_connections: webhookInfo.result.max_connections,
        allowed_updates: webhookInfo.result.allowed_updates,
        status: webhookInfo.result.url ? 'configured' : 'not_configured'
      } : { error: 'Failed to get webhook info', status: 'error' },
      
      commands: commandsInfo.ok ? {
        count: commandsInfo.result.length,
        commands: commandsInfo.result,
        status: commandsInfo.result.length > 0 ? 'configured' : 'not_configured'
      } : { error: 'Failed to get commands', status: 'error' },
      
      menu_button: menuInfo.ok ? {
        type: menuInfo.result.type,
        text: menuInfo.result.text,
        web_app_url: menuInfo.result.web_app?.url,
        status: menuInfo.result.type === 'web_app' ? 'configured' : 'default'
      } : { error: 'Failed to get menu button', status: 'error' },
      
      description: descInfo.ok ? {
        description: descInfo.result.description,
        status: descInfo.result.description ? 'configured' : 'not_configured'
      } : { error: 'Failed to get description', status: 'error' },
      
      short_description: shortDescInfo.ok ? {
        short_description: shortDescInfo.result.short_description,
        status: shortDescInfo.result.short_description ? 'configured' : 'not_configured'
      } : { error: 'Failed to get short description', status: 'error' },
      
      recent_activity: updatesInfo.ok ? {
        update_count: updatesInfo.result.length,
        last_update: updatesInfo.result.length > 0 ? {
          update_id: updatesInfo.result[updatesInfo.result.length - 1].update_id,
          timestamp: new Date(updatesInfo.result[updatesInfo.result.length - 1].message?.date * 1000 || Date.now()).toISOString()
        } : null,
        status: 'active'
      } : { error: 'Failed to get updates', status: 'error' }
    };
    
    // Overall health check
    const healthChecks = [
      botInfo.ok,
      webhookInfo.ok && webhookInfo.result.url,
      commandsInfo.ok && commandsInfo.result.length > 0,
      menuInfo.ok,
      descInfo.ok,
      shortDescInfo.ok
    ];
    
    const healthScore = healthChecks.filter(Boolean).length / healthChecks.length;
    
    status.overall_status = {
      health_score: Math.round(healthScore * 100),
      status: healthScore >= 0.8 ? 'healthy' : healthScore >= 0.6 ? 'warning' : 'error',
      message: healthScore >= 0.8 ? 
        '✅ Bot is fully configured and ready!' : 
        healthScore >= 0.6 ? 
        '⚠️ Bot is partially configured' : 
        '❌ Bot needs configuration',
      checks: {
        bot_info: botInfo.ok,
        webhook_configured: webhookInfo.ok && !!webhookInfo.result.url,
        commands_set: commandsInfo.ok && commandsInfo.result.length > 0,
        menu_button_set: menuInfo.ok,
        description_set: descInfo.ok,
        short_description_set: shortDescInfo.ok
      }
    };
    
    // Add quick links
    status.quick_links = {
      bot_url: 'https://t.me/Somania_Minihub_bot',
      web_app_url: 'https://somania-minihub.vercel.app/',
      webhook_url: 'https://somania-minihub.vercel.app/api/telegram/webhook',
      setup_url: 'https://somania-minihub.vercel.app/api/telegram/setup',
      github_repo: 'https://github.com/ombaviskar18/Somania_Minihub'
    };
    
    return NextResponse.json(status, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check bot status',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}